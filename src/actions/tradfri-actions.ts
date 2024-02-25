"use server";

import {TradfriScene} from "@/types/Scenes";
import {TradfriGroup} from "@/types/Light";
import TrafriService from "@/services/TrafriService";

export async function getTradfriScenes(): Promise<TradfriScene[]> {
    return TrafriService.getScenes()
}

export async function activateTradfriScene(id: string): Promise<void> {
    return TrafriService.setScene(id)
}

export async function getTradfriGroups(): Promise<TradfriGroup[]> {
    return TrafriService.getGroups()
}

export async function setLightBrightness(id: string, brightness: number): Promise<void> {
    return TrafriService.setLightBrightness(id, brightness)
}

export async function setLightColor(id: string, hexColor: string): Promise<void> {
    return TrafriService.setLightColor(id, hexColor)
}
