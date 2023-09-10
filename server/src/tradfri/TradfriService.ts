import Logger from '../utils/Logger'

// @ts-ignore
import config from '../../../shared/config.json'
// @ts-ignore
import {ApiScene} from '../../../shared/types/Scenes';
// @ts-ignore
import {ApiLight, ApiLightsGroup} from '../../../shared/types/Light';
import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";

export default class TradfriService {
    private static connection?: TradfriClient
    private static isInitializingConnection = false;

    private static scenes: Array<Scene> = []
    private static lights: Array<Accessory> = []
    private static groupLightsMap = new Map<string, {id: string, name: string, deviceIds: Array<string>}>();
    private static superGroup?: Group
    private logger = new Logger('TradfriService')

    constructor() {
        if (TradfriService.connection || TradfriService.isInitializingConnection) {
            return
        }
        TradfriService.isInitializingConnection = true;
        TradfriService
            .initConnection()
            .then(() => TradfriService.isInitializingConnection = false)
            .then(() => this.initDataAndListeners())
            .catch(() => {})
    }

    private static async initConnection(): Promise<void> {
        const logger = new Logger("TradfriService")
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
        TradfriService.connection = new TradfriClient(gateway.name)

        let identity: string
        let psk: string

        logger.log('authenticating with gateway')
        const response = await TradfriService.connection.authenticate(config.tradfri.connection.securityId)
        identity = response.identity
        psk = response.psk

        await TradfriService.connection.connect(identity, psk)
        logger.log("connected to gateway")
    }

    async initDataAndListeners(): Promise<void> {
        if (!TradfriService.connection) {
            return
        }

        const deleteScene = (id: number) => {
            TradfriService.scenes = TradfriService.scenes.filter(s => s.instanceId !== id)
        }

        const addOrUpdateScene = (scene: Scene) => {
            this.logger.log(`retrieved information for scene ${scene.name}`)
            deleteScene(scene.instanceId)
            TradfriService.scenes.push(scene)
        }

        const deleteLight = (id: number) => {
            TradfriService.lights = TradfriService.lights.filter(b => b.instanceId !== id)
        }

        const addOrUpdateLight = (device: Accessory) => {
            deleteLight(device.instanceId)
            if (device.type === AccessoryTypes.lightbulb) {
                this.logger.log(`retrieved information for lightbulb ${device.name}`)
                TradfriService.lights.push(device)
            }
        }

        TradfriService.connection
            .on('scene updated', (_group: number, scene: Scene) => addOrUpdateScene(scene))
            .on('scene removed', (_group: number, instanceId: number) => deleteScene(instanceId))
            .on('group updated', (group: Group) => {
                    if (group.name === 'SuperGroup') {
                        TradfriService.superGroup = group
                    } else {
                        const data = {
                            id: group.instanceId + '',
                            name: group.name,
                            deviceIds: group.deviceIDs.map(d => '' + d)
                        }
                        TradfriService.groupLightsMap.set(`${group.instanceId}`, data)
                    }
                }
            )
            .observeGroupsAndScenes()
            .catch()

        TradfriService.connection
            .on('device updated', (device: Accessory) => addOrUpdateLight(device))
            .on('device removed', (instanceId: number) => deleteLight(instanceId))
            .observeDevices()
            .catch()
    }

    private getLight(id: string): ApiLight | null {
        const accesory =  TradfriService.lights.find(l => `${l.instanceId}` === id )
        if (!accesory) {
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

    private getGroup(id: string): ApiLightsGroup | null {
        const group = TradfriService.groupLightsMap.get(id);
        if (!group) {
            return null
        }
        return {
            id: group.id,
            name: group.name,
            lights: group.deviceIds.map(id => this.getLight(id)).filter(Boolean) as Array<ApiLight>
        }
    }

    getGroups(): Array<ApiLightsGroup> {
        return Array.from(TradfriService.groupLightsMap.keys()).map((id: string) => this.getGroup(id)).filter(Boolean) as Array<ApiLightsGroup>
    }

    async setLightBrightness(lightId: string, brightness: number): Promise<void> {
        const light = TradfriService.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.warn('cannot set brightness for unknown bulb')
            throw 'unknown lightbulb'
        }

        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)))
        if (newBrightness === 0) {
            await light.lightList[0].turnOff();
        } else {
            await light.lightList[0].setBrightness(newBrightness, 0)
        }
        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }

    async setLightColor(lightId: string, hexColor: string): Promise<void> {
        const light = TradfriService.lights.filter(light => `${light.instanceId}` === lightId)[0]
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

    async setLightWhiteTemperature(lightId: string, temmperature: number): Promise<void> {
        const light = TradfriService.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.warn('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = light.lightList[0]?.spectrum
        if (spectrum !== 'white') {
            this.logger.warn('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        const prepTemp = Math.max(0, Math.min(100, temmperature * 100))
        await light.lightList[0].setColorTemperature(prepTemp, 0)
        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }

    getScenes(): Array<ApiScene> {
        return TradfriService.scenes.map((scene: Scene) => ({
            name: scene.name,
            id: `${scene.instanceId}`
        }))
    }

    async setScene(sceneId: string): Promise<void> {
        if (!TradfriService.superGroup) {
            this.logger.warn("Cannot set scene: no super group")
            return
        }
        this.logger.log("setting scene " + sceneId)
        await TradfriService.connection?.operateGroup(TradfriService.superGroup, {sceneId: Number.parseInt(sceneId),}, true)

        await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
    }
}
