"use client";

import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {ApiLightAction, ApiLightsGroup} from "../../../shared/types/Light";
import config from "../shared/config.json"
import {resolveApi} from "../utils";

const LightGroupsContext = createContext({
    lightGroups: [] as ApiLightsGroup[],
    updateGroups: () => {},
    setLightBrightness: (id: string, brightness: number) => {},
    setLightColor: (id: string, hexColor: string) => {},
    setLightWhiteTemperature: (id: string, value: number) => {}
})

function LightGroupsProvider(props: PropsWithChildren) {
    const [groups, setGroups] = useState<ApiLightsGroup[]>([]);

    const updateGroups = async (): Promise<void> => {
        const groupsResponse = await fetch(resolveApi(config.api.lights ,'groups'))
        const groupsJson = await groupsResponse.json()
        setGroups(groupsJson)
    }

    const setLightBrightness = async (id: string, brightness: number): Promise<void> => {
        await fetch(resolveApi(config.api.lights ,'action'), {
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
        await fetch(resolveApi(config.api.lights, 'action'), {
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

    const setLightWhiteTemperature = async (id: string, value: number): Promise<void> => {
        await fetch(resolveApi(config.api.lights ,'action'), {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify({
                type: 'set-white-temperature',
                lightId: id,
                value: value
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
            setLightBrightness,
            setLightWhiteTemperature
    }}>{props.children}</LightGroupsContext.Provider>
}

function useLightGroupsContext() {
    return useContext(LightGroupsContext)
}

export {
    useLightGroupsContext,
    LightGroupsProvider
}