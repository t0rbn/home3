import * as fs from 'fs';
import Logger from '../utils/Logger';
import config from '../Config.js';
import { AccessoryTypes, discoverGateway, TradfriClient } from "node-tradfri-client";
export default class TradfriService {
    connection;
    scenes = [];
    lights = [];
    groupLightsMap = new Map();
    superGroup;
    logger = new Logger('TradfriService');
    constructor() {
        this.initConnection().then(() => this.initDataAndListeners()).catch();
    }
    async initConnection() {
        this.logger.log('discovering tradfri gateway');
        let gateway;
        try {
            gateway = await discoverGateway();
        }
        catch (e) {
            this.logger.alert('Cannot discover gateway');
            console.log(e);
        }
        if (!gateway) {
            return;
        }
        this.logger.log('got gateway ' + gateway.name);
        this.connection = new TradfriClient(gateway.name);
        let identity;
        let psk;
        try {
            this.logger.log('reading credentials from file');
            let credsFile = JSON.parse(fs.readFileSync(config.tradfri.credentialsFileLocation, 'utf-8'));
            identity = credsFile.identity;
            psk = credsFile.psk;
        }
        catch (e) {
            this.logger.alert('failed to read credentials from file, will reauthenticate');
            const response = await this.connection.authenticate(config.tradfri.securityId);
            identity = response.identity;
            psk = response.psk;
            fs.writeFile(config.tradfri.credentialsFileLocation, JSON.stringify({ identity, psk }), () => this.logger.log(`wrote new credentials to ${config.tradfri.credentialsFileLocation}`));
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
            if (device.type === AccessoryTypes.lightbulb) {
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
        await light.lightList[0].setBrightness(newBrightness, config.transitionTime.brightness);
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
        await light.lightList[0].setColor(hexColor.replace('#', ''), config.transitionTime.color);
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
        await light.lightList[0].setColorTemperature(prepTemp, config.transitionTime.color);
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
            transitionTime: config.transitionTime.scene
        }, true);
    }
}
//# sourceMappingURL=TradfriService.js.map