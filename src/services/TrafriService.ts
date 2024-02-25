import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";
import config from "../config.json";
import {TradfriScene} from "@/types/Scenes";
import {TradfriLight, TradfriGroup} from "@/types/Light";
import LogService from "@/services/LogService";

export default class TrafriService {
    private static connection?: TradfriClient
    private static isInitializingConnection = false;

    private static scenes: Array<Scene> = []
    private static lights: Array<Accessory> = []
    private static groupLightsMap = new Map<string, {id: string, name: string, deviceIds: Array<string>}>();
    private static superGroup?: Group
    private static logger = new LogService('TradfriService')

    constructor() {
      
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
        this.connection = new TradfriClient(gateway.name)

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

        const deleteScene = (id: number) => {
            this.scenes = this.scenes.filter(s => s.instanceId !== id)
        }

        const addOrUpdateScene = (scene: Scene) => {
            this.logger.log(`retrieved information for scene ${scene.name}`)
            deleteScene(scene.instanceId)
            this.scenes.push(scene)
        }

        const deleteLight = (id: number) => {
            this.lights = this.lights.filter(b => b.instanceId !== id)
        }

        const addOrUpdateLight = (device: Accessory) => {
            deleteLight(device.instanceId)
            if (device.type === AccessoryTypes.lightbulb) {
                this.logger.log(`retrieved information for lightbulb ${device.name}`)
                this.lights.push(device)
            }
        }

        const groupObserver = this.connection
            .on('scene updated', (_group: number, scene: Scene) => addOrUpdateScene(scene))
            .on('scene removed', (_group: number, instanceId: number) => deleteScene(instanceId))
            .on('group updated', (group: Group) => {
                    if (group.name === 'SuperGroup') {
                        this.superGroup = group
                    } else {
                        const data = {
                            id: group.instanceId + '',
                            name: group.name,
                            deviceIds: group.deviceIDs.map(d => '' + d)
                        }
                        this.groupLightsMap.set(`${group.instanceId}`, data)
                    }
                }
            )
            .observeGroupsAndScenes()
            .catch()

        const deviceObserver = this.connection
            .on('device updated', (device: Accessory) => addOrUpdateLight(device))
            .on('device removed', (instanceId: number) => deleteLight(instanceId))
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
            .then(() => new Promise(r => setTimeout(r, config.tradfri.connection.initTimeoutS * 1000)))
            .catch((e) => this.logger.warn(e.message))
    }

    private static getLight(id: string): TradfriLight | null {
        const accesory =  this.lights.find(l => `${l.instanceId}` === id )
        if (!accesory || !accesory.alive) {
            return null
        }

        const light = accesory.lightList[0] ?? {}
        const generalData = {
            id: accesory.instanceId + '',
            name: accesory.name,
            brightness: light.onOff ? (light.dimmer / 100) : 0
        }

        let spectrumData: any = {spectrum: 'none'}

        if (light.spectrum === 'rgb') {
            spectrumData = {spectrum: 'rgb', color: `#${light.color}`}
        }

        if (light.spectrum === 'white') {
            spectrumData = {spectrum: 'white', whiteTemperature: Math.min(100, Math.max(0, light.colorTemperature / 100))}
        }

        return {
            ...generalData,
            ...spectrumData
        }
    }

    private static getGroup(id: string): TradfriGroup | null {
        const group = this.groupLightsMap.get(id);
        if (!group) {
            return null
        }
        return {
            id: group.id,
            name: group.name,
            lights: group.deviceIds.map(id => this.getLight(id)).filter(Boolean) as Array<TradfriLight>
        }
    }

    static async getGroups(): Promise<Array<TradfriGroup>> {
        await this.init()
        return Array.from(this.groupLightsMap.keys()).map((id: string) => this.getGroup(id)).filter(Boolean) as Array<TradfriGroup>
    }

    static async setLightBrightness(lightId: string, brightness: number): Promise<void> {
        await this.init()
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.warn('cannot set brightness for unknown bulb')
            throw 'unknown lightbulb'
        }

        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)))
        await light.lightList[0].setBrightness(newBrightness, 0)
        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }

    static async setLightColor(lightId: string, hexColor: string): Promise<void> {
        await this.init()
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.warn('cannot set color for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = light.lightList[0]?.spectrum
        if (spectrum === 'none') {
            this.logger.warn('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        await light.lightList[0].setColor(hexColor.replace('#', ''), 0)
        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }

    static async getScenes(): Promise<Array<TradfriScene>> {
        await this.init()
        return this.scenes.map((scene: Scene) => ({
            name: scene.name,
            id: `${scene.instanceId}`
        }))
    }

    static async setScene(sceneId: string): Promise<void> {
        await this.init()
        if (!this.superGroup) {
            this.logger.warn("Cannot set scene: no super group")
            return
        }
        this.logger.log("setting scene " + sceneId)
        await this.connection?.operateGroup(this.superGroup, {sceneId: Number.parseInt(sceneId),}, true)

        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }
}
