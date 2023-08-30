"use client";

import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {ApiLightAction, ApiLightsGroup} from "../../../shared/types/Light";
import config from "../../../shared/config.json"

const LightGroupsContext = createContext({
    lightGroups: [] as ApiLightsGroup[],
    updateGroups: () => {},
    setLightBrightness: (id: string, brightness: number) => {},
    setLightColor: (id: string, hexColor: string) => {}
})

function LightGroupsProvider(props: PropsWithChildren) {
    const [groups, setGroups] = useState<ApiLightsGroup[]>([]);

    const updateGroups = async (): Promise<void> => {
        const groupsResponse = await fetch(`${config.api.lights}/groups`)
        const groupsJson = await groupsResponse.json()
        setGroups(groupsJson)
    }

    const setLightBrightness = async (id: string, brightness: number): Promise<void> => {
        await fetch(`${config.api.lights}/actions`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify({
                type: 'set-brightness',
                lightId: id,
                value: brightness
            } as ApiLightAction)
        })
        await updateGroups()
    }

    const setLightColor = async (id: string, hexColor: string): Promise<void> => {
        await fetch(`${config.api.lights}/actionns`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify({
                type: 'set-color',
                lightId: id,
                value: hexColor
            } as ApiLightAction)
        })
        await updateGroups()
    }

    useEffect(() => {
        updateGroups().catch(() => {})
    }, [])

    return <LightGroupsContext.Provider
        value={{
            lightGroups: groups,
            updateGroups,
            setLightColor,
            setLightBrightness
    }}>{props.children}</LightGroupsContext.Provider>
}

function useLightGroupsContext() {
    return useContext(LightGroupsContext)
}

export {
    useLightGroupsContext,
    LightGroupsProvider
}