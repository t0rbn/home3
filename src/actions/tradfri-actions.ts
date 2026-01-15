"use server";

import {TradfriApiGroup, TradfriApiLight, TradfriApiScene} from "@/types/Tradfri";
import {TradfriService} from "@/services/TradfriService";
import {MockTradfriService} from "@/services/MockTradfriService";

const service = process.env.MOCK_TRADFRI ? MockTradfriService : TradfriService

export const getGroups: () => Promise<Array<TradfriApiGroup>> = async () => service.getGroups()

export const getScenes: () => Promise<Array<TradfriApiScene>> = async () => service.getScenes()
export const activateScene = async (sceneId: number) => service.activateScene(sceneId)

export const getLight = async (lightId: number): Promise<TradfriApiLight | null> => service.getLight(lightId)
export const setLightBrightness = async (lightId: number, newBrightness: number) => service.setLightBrightness(lightId, newBrightness)
export const setLightColor = async (lightId: number, newColor: string) => service.setLightColor(lightId, newColor)

export const togglePlug = async (plugId: number) => service.togglePlug(plugId)
