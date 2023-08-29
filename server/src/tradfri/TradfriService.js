"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const Logger_1 = __importDefault(require("../utils/Logger"));
const Config_js_1 = __importDefault(require("../Config.js"));
const node_tradfri_client_1 = require("node-tradfri-client");
class TradfriService {
    connection;
    scenes = [];
    lights = [];
    groupLightsMap = new Map();
    superGroup;
    logger = new Logger_1.default('TradfriService');
    constructor() {
        this.initConnection().then(() => this.initDataAndListeners()).catch();
    }
    async initConnection() {
        this.logger.log('discovering tradfri gateway');
        let gateway;
        try {
            gateway = await (0, node_tradfri_client_1.discoverGateway)();
        }
        catch (e) {
            this.logger.alert('Cannot discover gateway');
            console.log(e);
        }
        if (!gateway) {
            return;
        }
        this.logger.log('got gateway ' + gateway.name);
        this.connection = new node_tradfri_client_1.TradfriClient(gateway.name);
        let identity;
        let psk;
        try {
            this.logger.log('reading credentials from file');
            let credsFile = JSON.parse(fs.readFileSync(Config_js_1.default.tradfri.credentialsFileLocation, 'utf-8'));
            identity = credsFile.identity;
            psk = credsFile.psk;
        }
        catch (e) {
            this.logger.alert('failed to read credentials from file, will reauthenticate');
            const response = await this.connection.authenticate(Config_js_1.default.tradfri.securityId);
            identity = response.identity;
            psk = response.psk;
            fs.writeFile(Config_js_1.default.tradfri.credentialsFileLocation, JSON.stringify({ identity, psk }), () => this.logger.log(`wrote new credentials to ${Config_js_1.default.tradfri.credentialsFileLocation}`));
        }
        await this.connection.connect(identity, psk);
    }
    async initDataAndListeners() {
        if (!this.connection) {
            return;
        }
        const deleteScene = (id) => {
            this.scenes = this.scenes.filter(s => s.instanceId !== id);
        };
        const addOrUpdateScene = (scene) => {
            this.logger.log(`retrieved information for scene ${scene.name}`);
            deleteScene(scene.instanceId);
            this.scenes.push(scene);
        };
        const deleteLight = (id) => {
            this.lights = this.lights.filter(b => b.instanceId !== id);
        };
        const addOrUpdateLight = (device) => {
            deleteLight(device.instanceId);
            if (device.type === node_tradfri_client_1.AccessoryTypes.lightbulb) {
                this.logger.log(`retrieved information for lightbulb ${device.name}`);
                this.lights.push(device);
            }
        };
        this.connection
            .on('scene updated', (_group, scene) => addOrUpdateScene(scene))
            .on('scene removed', (_group, instanceId) => deleteScene(instanceId))
            .on('group updated', (group) => {
            if (group.name === 'SuperGroup') {
                this.superGroup = group;
            }
            else {
                const data = {
                    id: group.instanceId + '',
                    name: group.name,
                    deviceIds: group.deviceIDs.map(d => '' + d)
                };
                this.groupLightsMap.set(`${group.instanceId}`, data);
            }
        })
            .observeGroupsAndScenes()
            .catch();
        this.connection
            .on('device updated', (device) => addOrUpdateLight(device))
            .on('device removed', (instanceId) => deleteLight(instanceId))
            .observeDevices()
            .catch();
    }
    getLight(id) {
        const accesory = this.lights.find(l => `${l.instanceId}` === id);
        if (!accesory) {
            return null;
        }
        const generalData = {
            id: accesory.instanceId + '',
            name: accesory.name
        };
        const light = accesory.lightList[0] ?? {};
        let spectrumData = { spectrum: 'none' };
        if (light.spectrum === 'rgb') {
            spectrumData = { spectrum: 'rgb', color: light.color };
        }
        if (light.spectrum === 'white') {
            spectrumData = { spectrum: 'white', whiteTemperature: Math.min(100, Math.max(0, light.colorTemperature / 100)) };
        }
        return {
            ...generalData,
            ...spectrumData
        };
    }
    getGroup(id) {
        const group = this.groupLightsMap.get(id);
        if (!group) {
            return null;
        }
        return {
            id: group.id,
            name: group.name,
            lights: group.deviceIds.map(id => this.getLight(id)).filter(Boolean)
        };
    }
    getGroups() {
        return Array.from(this.groupLightsMap.keys()).map((id) => this.getGroup(id)).filter(Boolean);
    }
    async setLightBrightness(lightId, brightness) {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0];
        if (!light) {
            this.logger.alert('cannot set brightness for unknown bulb');
            throw 'unknown lightbulb';
        }
        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)));
        await light.lightList[0].setBrightness(newBrightness, Config_js_1.default.transitionTime.brightness);
    }
    async setLightColor(lightId, hexColor) {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0];
        if (!light) {
            this.logger.alert('cannot set color for unknown bulb');
            throw 'unknown lightbulb';
        }
        const spectrum = light.lightList[0]?.spectrum;
        if (spectrum === 'none') {
            this.logger.alert('color operation not supported by spectrum');
            throw 'color operation not supported';
        }
        await light.lightList[0].setColor(hexColor.replace('#', ''), Config_js_1.default.transitionTime.color);
    }
    async setLightWhiteTemperature(lightId, temmperature) {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0];
        if (!light) {
            this.logger.alert('cannot set temperature for unknown bulb');
            throw 'unknown lightbulb';
        }
        const spectrum = light.lightList[0]?.spectrum;
        if (spectrum !== 'white') {
            this.logger.alert('color operation not supported by spectrum');
            throw 'color operation not supported';
        }
        const prepTemp = Math.max(0, Math.min(100, temmperature * 100));
        await light.lightList[0].setColorTemperature(prepTemp, Config_js_1.default.transitionTime.color);
    }
    getScenes() {
        return this.scenes.map((scene) => ({
            name: scene.name,
            id: scene.instanceId
        }));
    }
    async setScene(sceneId) {
        if (!this.superGroup) {
            return;
        }
        await this.connection?.operateGroup(this.superGroup, {
            sceneId: Number.parseInt(sceneId),
            transitionTime: Config_js_1.default.transitionTime.scene
        }, true);
    }
}
exports.default = TradfriService;
//# sourceMappingURL=TradfriService.js.map