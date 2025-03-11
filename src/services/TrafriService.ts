import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";
import config from "../config.json";
import {TradfriGroup, TradfriLight, TradfriPlug, TradfriScene} from "@/types/Tradfri";
import LogService from "@/services/LogService";

export default class TrafriService {
    private static connection?: TradfriClient
    private static isInitializingConnection = false;

    private static logger = new LogService('TradfriService')

    private static superGroup: Group
    private static groups: Array<Omit<TradfriGroup, 'lights' | 'plugs'> & { deviceIds: Array<number> }> = []
    private static scenes: Array<TradfriScene> = []
    private static plugs: Array<TradfriPlug> = []
    private static lights: Array<TradfriLight> = []

    constructor() {

    }

    private static mapLight(light: Accessory): TradfriLight | null {
        if (light.type !== AccessoryTypes.lightbulb) {
            this.logger.warn(`Cannot map device ${light.instanceId}: not a light bulb`)
            return null
        }

        const bulb = light.lightList[0]

        return {
            name: light.name,
            id: light.instanceId,
            brightness: bulb.onOff ? (bulb.dimmer / 100) : 0,
            color: bulb.color,
            spectrum: bulb.spectrum,
            setBrightness: (b: number) => bulb.setBrightness(100 * b).then(() => {}),
            setColor: bulb.spectrum === 'none' ? undefined : (v: string) => bulb.setColor(v.replaceAll(/[^0-9a-fA-F]/g, ''))
        } as TradfriLight
    }

    private static mapPlug(plug: Accessory): TradfriPlug | null {
        if (plug.type !== AccessoryTypes.plug) {
            this.logger.warn(`Cannot map device ${plug.instanceId}: not a plug`)
            return null
        }

        return {
            name: plug.name,
            id: plug.instanceId,
            isOn: plug.plugList[0].onOff,
            toggle: () => plug.plugList[0].toggle().then(() => {})
        } as TradfriPlug
    }

    static async initConnection(): Promise<void> {
        const logger = new LogService("TradfriService")
        logger.log('discovering tradfri gateway')
        let gateway
        try {
            gateway = await discoverGateway()
        } catch (e) {
            logger.warn('Cannot discover gateway')
            console.log(e)
        }
        if (!gateway) {
            return
        }

        logger.log('got gateway ' + gateway.name)
        this.connection = new TradfriClient(gateway.addresses[0])
        let identity: string
        let psk: string

        logger.log('authenticating with gateway')
        const response = await this.connection.authenticate(config.tradfri.connection.securityId)
        identity = response.identity
        psk = response.psk

        await this.connection.connect(identity, psk)
        logger.log("connected to gateway")
    }

    static async initDataAndListeners(): Promise<void> {
        if (!this.connection) {
            return
        }

        const addOrUpdateScene = (scene: Scene) => {
            const mapped = {
                name: scene.name,
                id: scene.instanceId,
                activate: () => this.superGroup.activateScene(scene.instanceId).then(() => {})
            } as TradfriScene

            this.scenes = [
                ...this.scenes.filter(s => s.id !== mapped.id),
                mapped
            ]
        }


        const addOrUpdateLight = (device: Accessory) => {
            const mapped = this.mapLight(device)
            if (!mapped) {
                return;
            }

            this.lights = [
                ...this.lights.filter(l => l.id !== mapped.id),
                mapped
            ]
        }

        const addOrUpdatePlug = (device: Accessory) => {
            const mapped = this.mapPlug(device)
            if (!mapped) {
                return;
            }

            this.plugs = [
                ...this.plugs.filter(p => p.id !== mapped.id),
                mapped
            ]
        }

        const groupObserver = this.connection
            .on('scene updated', (_group: number, scene: Scene) => addOrUpdateScene(scene))
            .on('group updated', (group: Group) => {
                    if (group.name === 'SuperGroup') {
                        this.superGroup = group
                        return;
                    }

                    this.groups = [
                        ...this.groups.filter(g => g.id !== group.instanceId),
                        {
                            id: group.instanceId,
                            name: group.name,
                            deviceIds: group.deviceIDs
                        }
                    ]
                }
            )
            .observeGroupsAndScenes()
            .catch()

        const deviceObserver = this.connection
            .on('device updated', (device: Accessory) => {
                if (!device.alive) {
                    this.lights = this.lights.filter(l => l.id !== device.instanceId)
                    this.plugs = this.plugs.filter(l => l.id !== device.instanceId)
                    return
                }

                if (device.type === AccessoryTypes.lightbulb) {
                    addOrUpdateLight(device)
                    return
                }
                if (device.type === AccessoryTypes.plug) {
                    addOrUpdatePlug(device)
                    return;
                }
            })
            .observeDevices()
            .catch()

        return Promise.all([groupObserver, deviceObserver]).then(() => {})
    }

    private static async init() {
        if (this.connection || this.isInitializingConnection) {
            return
        }
        this.isInitializingConnection = true;
        return this
            .initConnection()
            .then(() => this.initDataAndListeners())
            .then(() => this.isInitializingConnection = false)
            .then(TrafriService.operationTimeout)
            .catch((e) => this.logger.warn(e.message))
    }

    private static async operationTimeout() {
        return new Promise(r => setTimeout(r, config.tradfri.connection.initTimeoutS * 1000))
    }

    static async getGroups(): Promise<Array<TradfriGroup>> {
        await this.init()
        return this.groups.map(g => ({
            ...g,
            deviceIds: undefined,
            lights: this.lights.filter(l => g.deviceIds.includes(l.id)).map(l => ({...l, setColor: undefined, setBrightness: undefined})),
            plugs: this.plugs.filter(p => g.deviceIds.includes(p.id)).map(p => ({...p, toggle: undefined}))
        }))
    }

    static async getScenes(): Promise<Array<TradfriScene>> {
        await this.init()
        return this.scenes.map(s => ({...s, activate: undefined}));
    }

    static async activateScene(sceneId: number) {
        const fn = this.scenes.find(s => s.id === sceneId)?.activate
        if (fn) {
            return fn().then(TrafriService.operationTimeout)
        }
    }

    static async setLightBrightness(lightId: number, newBrightness: number) {
        const fn = this.lights.find(l => l.id === lightId)?.setBrightness
        if (fn) {
            return fn(newBrightness).then(TrafriService.operationTimeout)
        }
    }

    static async setLightColor(lightId: number, newColor: string) {
        const fn = this.lights.find(l => l.id === lightId)?.setColor
        if (fn) {
            return fn(newColor).then(TrafriService.operationTimeout)
        }
    }

    static async togglePlug(plugId: number) {
        const fn = this.plugs.find(p => p.id === plugId)?.toggle
        if (fn) {
            return fn().then(TrafriService.operationTimeout)
        }
    }
}
