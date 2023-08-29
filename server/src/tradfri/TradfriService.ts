import * as fs from 'fs'
import Logger from '../utils/Logger'
import config from '../Config.js'
// @ts-ignore
import {ApiScene} from '../../../shared/types/Scenes';
// @ts-ignore
import {ApiLight, ApiLightsGroup} from '../../../shared/types/Light';
import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";


export default class TradfriService {
    private connection?: TradfriClient
    private scenes: Array<Scene> = []
    private lights: Array<Accessory> = []
    private groupLightsMap = new Map<string, {id: string, name: string, deviceIds: Array<string>}>();
    private superGroup?: Group
    private logger = new Logger('TradfriService')

    constructor() {
        this.initConnection().then(() => this.initDataAndListeners()).catch()
    }

    async initConnection(): Promise<void> {
        this.logger.log('discovering tradfri gateway')
        let gateway
        try {
            gateway = await discoverGateway()
        } catch (e) {
            this.logger.alert('Cannot discover gateway')
            console.log(e)
        }
        if (!gateway) {
            return
        }

        this.logger.log('got gateway ' + gateway.name)
        this.connection = new TradfriClient(gateway.name)

        let identity: string
        let psk: string

        try {
            this.logger.log('reading credentials from file')
            let credsFile = JSON.parse(fs.readFileSync(config.tradfri.credentialsFileLocation, 'utf-8'))
            identity = credsFile.identity
            psk = credsFile.psk
        } catch (e) {
            this.logger.alert('failed to read credentials from file, will reauthenticate')
            const response = await this.connection.authenticate(config.tradfri.securityId)
            identity = response.identity
            psk = response.psk
            fs.writeFile(
                config.tradfri.credentialsFileLocation,
                JSON.stringify({identity, psk}),
                () => this.logger.log(`wrote new credentials to ${config.tradfri.credentialsFileLocation}`)
            )
        }
        await this.connection.connect(identity, psk)
    }

    async initDataAndListeners(): Promise<void> {
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

        this.connection
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

        this.connection
            .on('device updated', (device: Accessory) => addOrUpdateLight(device))
            .on('device removed', (instanceId: number) => deleteLight(instanceId))
            .observeDevices()
            .catch()
    }

    private getLight(id: string): ApiLight | null {
        const accesory =  this.lights.find(l => `${l.instanceId}` === id )
        if (!accesory) {
            return null
        }

        const generalData = {
            id: accesory.instanceId + '',
            name: accesory.name
        }

        const light = accesory.lightList[0] ?? {}
        let spectrumData: any = {spectrum: 'none'}

        if (light.spectrum === 'rgb') {
            spectrumData = {spectrum: 'rgb', color: light.color}
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
        const group = this.groupLightsMap.get(id);
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
        return Array.from(this.groupLightsMap.keys()).map((id: string) => this.getGroup(id)).filter(Boolean) as Array<ApiLightsGroup>
    }

    async setLightBrightness(lightId: string, brightness: number): Promise<void> {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.alert('cannot set brightness for unknown bulb')
            throw 'unknown lightbulb'
        }

        const newBrightness = Math.max(0, Math.min(100, Math.round(brightness * 100)))
        await light.lightList[0].setBrightness(newBrightness, config.transitionTime.brightness)
    }

    async setLightColor(lightId: string, hexColor: string): Promise<void> {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.alert('cannot set color for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = light.lightList[0]?.spectrum
        if (spectrum === 'none') {
            this.logger.alert('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        await light.lightList[0].setColor(hexColor.replace('#', ''), config.transitionTime.color)
    }

    async setLightWhiteTemperature(lightId: string, temmperature: number): Promise<void> {
        const light = this.lights.filter(light => `${light.instanceId}` === lightId)[0]
        if (!light) {
            this.logger.alert('cannot set temperature for unknown bulb')
            throw 'unknown lightbulb'
        }

        const spectrum = light.lightList[0]?.spectrum
        if (spectrum !== 'white') {
            this.logger.alert('color operation not supported by spectrum')
            throw 'color operation not supported'
        }
        const prepTemp = Math.max(0, Math.min(100, temmperature * 100))
        await light.lightList[0].setColorTemperature(prepTemp, config.transitionTime.color)
    }

    getScenes(): Array<ApiScene> {
        return this.scenes.map((scene: Scene) => ({
            name: scene.name,
            id: scene.instanceId
        }))
    }

    async setScene(sceneId: string): Promise<void> {
        if (!this.superGroup) {
            return
        }
        await this.connection?.operateGroup(this.superGroup, {
            sceneId: Number.parseInt(sceneId),
            transitionTime: config.transitionTime.scene
        }, true)
    }
}
