"use server";

import {TradfriScene} from "@/types/Scenes";
import {TradfriGroup} from "@/types/Light";
import TradfriService from "@/services/tradfri-service";

export async function getTradfriScenes(): Promise<TradfriScene[]> {
    const ts = new TradfriService()
    return ts.getScenes()
}

export async function activateTradfriScene(id: string): Promise<void> {
    const ts = new TradfriService()
    return ts.setScene(id)
}

export async function getTradfriGroups(): Promise<TradfriGroup[]> {
    const ts = new TradfriService()
    return ts.getGroups()
}

export async function setLightBrightness(id: string, brightness: number): Promise<void> {
    const ts = new TradfriService()
    return ts.setLightBrightness(id, brightness)
}

export async function setLightColor(id: string, hexColor: string): Promise<void> {
    const ts = new TradfriService();
    return ts.setLightColor(id, hexColor)
}
