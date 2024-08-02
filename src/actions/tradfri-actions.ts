"use server";

import {TradfriGroup, TradfriScene} from "@/types/Tradfri";
import TrafriService from "@/services/TrafriService";

export const getGroups: () => Promise<Array<TradfriGroup>> = async () => TrafriService.getGroups()


export const getScenes: () => Promise<Array<TradfriScene>> = async () => TrafriService.getScenes()
export const activateScene = (sceneId: number) => TrafriService.activateScene(sceneId)

export const setLightBrightness = (lightId: number, newBrightness: number)  => TrafriService.setLightBrightness(lightId, newBrightness)
export const setLightColor = (lightId: number, newColor: string)  => TrafriService.setLightColor(lightId, newColor)

export const  togglePlug = (plugId: number)  => TrafriService.togglePlug(plugId)
