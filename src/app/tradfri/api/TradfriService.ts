import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";
import config from "../../../config.json";
import {TradfriApiGroup, TradfriApiLight, TradfriApiScene, TradfriGroup, TradfriLight, TradfriPlug, TradfriScene} from "@/types/Tradfri";
import Logger from "@/utils/Logger";
import {MockTradfriService} from "@/app/tradfri/api/MockTradfriService";

export class TradfriService {
    private static connection?: TradfriClient
    private static isInitializingConnection = false;

    private static logger = new Logger('TradfriService')

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

    private static async initConnection(): Promise<void> {
        const logger = new Logger("TradfriService")
        logger.log('discovering tradfri gateway')
        let gateway
        try {
            gateway = await discoverGateway()
        } catch (e) {
            logger.warn('Cannot discover gateway')
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

    private static async initDataAndListeners(): Promise<void> {
        if (!this.connection) {
            this.logger.log("No current connection; initializing...")
            return
        }

        const addOrUpdateScene = (scene: Scene) => {
            const mapped = {
                name: scene.name,
                id: scene.instanceId,
                activate: () => this.superGroup.activateScene(scene.instanceId).then(() => {})
            } as TradfriScene

            this.logger.log(`updated scene ${JSON.stringify(mapped)}`)

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

            this.logger.log(`updated light ${JSON.stringify(mapped)}`)

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

            this.logger.log(`updated plug ${JSON.stringify(mapped)}`)

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

                    const mapped = {
                        id: group.instanceId,
                        name: group.name,
                        deviceIds: group.deviceIDs
                    }

                    this.logger.log(`updated group ${JSON.stringify(mapped)}`)

                    this.groups = [
                        ...this.groups.filter(g => g.id !== group.instanceId),
                        mapped
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

    private static async init(): Promise<void> {
        if (this.connection || this.isInitializingConnection) {
            return
        }
        this.isInitializingConnection = true;
        return this
            .initConnection()
            .then(() => this.initDataAndListeners())
            .then(() => this.isInitializingConnection = false)
            .then(TradfriService.operationTimeout)
            .catch((e) => this.logger.warn(e.message))
    }

    private static async operationTimeout(): Promise<void> {
        return new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs))
    }

    static async getGroups(): Promise<Array<TradfriApiGroup>> {
        await this.init()
        return this.groups.map(g => ({
            ...g,
            deviceIds: undefined,
            lights: this.lights.filter(l => g.deviceIds.includes(l.id)).map(l => ({...l, setColor: undefined, setBrightness: undefined})),
            plugs: this.plugs.filter(p => g.deviceIds.includes(p.id)).map(p => ({...p, toggle: undefined}))
        }))
    }

    static async getScenes(): Promise<Array<TradfriApiScene>> {
        await this.init()
        return this.scenes.map(s => ({name: s.name, id: s.id}));
    }

    static async activateScene(sceneId: number): Promise<void> {
        const scene = this.scenes.find(s => s.id === sceneId)
        if (!scene) {
            this.logger.warn(`cannot activate scene${scene}: not found`)
            return
        }

        this.logger.log(`activating scene ${scene?.name} (${sceneId})`)
        const fn = scene?.activate
        if (fn) {
            return fn()
                .then(TradfriService.operationTimeout)
        }
    }

    static async getLight(id: number): Promise<TradfriApiLight | null> {
        await this.init();
        const light = this.lights.find(l => l.id === id)
        if (!light) {
            return null
        }

        return {
            id: light.id,
            name: light.name,
            color: light.color,
            brightness: light.brightness,
            availableWhiteColors: light.spectrum === 'none' ? undefined : config.tradfri.colors.white,
            availableRgbColors: light.spectrum === 'rgb' ? config.tradfri.colors.rgb.map(c => '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join('')) : undefined,
        }
    }

    static async setLightBrightness(lightId: number, newBrightness: number): Promise<void> {
        const fn = this.lights.find(l => l.id === lightId)?.setBrightness
        if (fn) {
            return fn(newBrightness)
                .then(TradfriService.operationTimeout)
        }
    }

    static async setLightColor(lightId: number, newColor: string): Promise<void> {
        const fn = this.lights.find(l => l.id === lightId)?.setColor
        if (fn) {
            return fn(newColor)
                .then(TradfriService.operationTimeout)
        }
    }

    static async togglePlug(plugId: number): Promise<void> {
        const fn = this.plugs.find(p => p.id === plugId)?.toggle
        if (fn) {
            return fn()
                .then(TradfriService.operationTimeout)
        }
    }
}
