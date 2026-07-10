"use server"

import {Accessory, AccessoryTypes, discoverGateway, Group, Scene, TradfriClient} from "node-tradfri-client";
import config from "@/config.json";
import {TradfriDevice, TradfriGroup, TradfriLight, TradfriPlug, TradfriScene} from "@/types/Tradfri";
import Logger from "@/utils/Logger";
import {refresh, revalidatePath} from "next/cache";

const logger = new Logger('TradfriService')

const SUPER_GROUP_KEY = 'SuperGroup'

let connection: TradfriClient | undefined = undefined
let isInitializingConnection = false;

let groups: Array<Group> = []
let scenes: Array<Scene> = []
let accessories: Array<Accessory> = []

async function initConnection(): Promise<void> {
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
    connection = new TradfriClient(gateway.addresses[0])
    let identity: string
    let psk: string

    logger.log('authenticating with gateway')
    const response = await connection.authenticate(config.tradfri.connection.securityId)
    identity = response.identity
    psk = response.psk

    await connection.connect(identity, psk)
    logger.log("connected to gateway")
}

async function initDataAndListeners(): Promise<void> {
    if (!connection) {
        logger.log("No current connection; initializing...")
        return
    }

    const addOrUpdateScene = (scene: Scene) => {
        logger.log(`updating scene ${scene.name}`)
        scenes = [
            ...scenes.filter(e => e.instanceId !== scene.instanceId),
            scene
        ]
    }

    const addOrUpdateAccessory = (accessory: Accessory) => {
        logger.log(`updating accessory ${accessory.name}`)
        accessories = [
            ...accessories.filter(e => e.instanceId !== accessory.instanceId),
            accessory
        ]
    }

    const addOrUpdateGroup = (group: Group) => {
        logger.log(`updating group ${group.name}`)
        groups = [
            ...groups.filter(e => e.instanceId !== group.instanceId),
            group
        ]
    }

    const groupObserver = connection
        .on('scene updated', (_group: number, scene: Scene) => addOrUpdateScene(scene))
        .on('group updated', (group: Group) => addOrUpdateGroup(group))
        .observeGroupsAndScenes()
        .catch()

    const deviceObserver = connection
        .on('device updated', (accessory: Accessory) => addOrUpdateAccessory(accessory))
        .observeDevices()
        .catch()

    return Promise.all([groupObserver, deviceObserver]).then(() => {
    })
}

async function init(): Promise<void> {
    if (connection || isInitializingConnection) {
        return
    }
    isInitializingConnection = true;
    await initConnection()
        .then(() => initDataAndListeners())
        .then(() => isInitializingConnection = false)
        .catch((e) => logger.warn(e.message))
}

async function operationTimeout(): Promise<void> {
    return new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs))
}

function getSuperGroup(): Group {
    const superGroup = groups.find(g => g.name === SUPER_GROUP_KEY)
    if (!superGroup) {
        throw new Error("no supergroup initialized")
    }
    return superGroup
}

function mapGroup(group: Group): TradfriGroup {
    return {
        name: group.name,
        id: group.instanceId,
        devices: accessories.filter(a => group.deviceIDs.includes(a.instanceId)).map(d => mapDevice(d)).filter(Boolean) as Array<TradfriDevice>
    }
}

function mapDevice(accessory: Accessory): TradfriDevice | null {
    if (!accessory.alive) {
        return null;
    }

    if (accessory.type === AccessoryTypes.lightbulb) {
        return {
            type: 'light',
            id: accessory.instanceId,
            name: accessory.name,
            brightness: accessory.lightList[0].dimmer * 0.01,
            color: `#${accessory.lightList[0].color}`,
            spectrum: accessory.lightList[0].spectrum
        } as TradfriLight
    }

    if (accessory.type === AccessoryTypes.plug) {
        return {
            type: 'plug',
            id: accessory.instanceId,
            name: accessory.name,
            isOn: accessory.plugList[0].onOff
        } as TradfriPlug
    }

    return null
}

function mapScene(scene: Scene): TradfriScene {
    return {
        id: scene.instanceId,
        name: scene.name,
    }
}

export async function getGroups(): Promise<Array<TradfriGroup>> {
    await init()
    return groups.filter(g => g.name !== SUPER_GROUP_KEY).map(g => mapGroup(g))
}

export async function getScenes(): Promise<Array<TradfriScene>> {
    await init()
    return scenes.map(g => mapScene(g))
}

export async function activateScene(sceneId: number): Promise<void> {
    await init()
    const scene = scenes.find(s => s.instanceId === sceneId)
    if (!scene) {
        throw new Error('scene not found')
    }

    await getSuperGroup().activateScene(sceneId)
}

export async function getDevice(id: number): Promise<TradfriDevice> {
    await init()
    return mapDevice(accessories.find(device => device.instanceId === id)!)!
}

export async function setLightBrightness(lightId: number, newBrightness: number): Promise<void> {
    await init()
    await accessories.find(a => a.instanceId === lightId && a.type === AccessoryTypes.lightbulb)?.lightList[0].setBrightness(newBrightness * 100, 0)
    await operationTimeout()
}

export async function setLightColor(lightId: number, newColor: string): Promise<void> {
    await init()
    await accessories.find(a => a.instanceId === lightId && a.type === AccessoryTypes.lightbulb)?.lightList[0].setColor(newColor.replaceAll(/[^0-9a-fA-F]/gi, ''), 0)
    await operationTimeout()
}

export async function togglePlug(plugId: number): Promise<void> {
    await init()
    await accessories.find(a => a.instanceId === plugId && a.type === AccessoryTypes.plug)?.plugList[0].toggle()
    await operationTimeout()
}
