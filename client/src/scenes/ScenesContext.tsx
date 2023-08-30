"use client";

import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import config from "../shared/config.json"
import {ApiScene, ApiSceneAction} from "../../../shared/types/Scenes";
import {useLightGroupsContext} from "../lights/LightGroupsContext";

const ScenesContext = createContext({
    scenes: [] as ApiScene[],
    activateSceneById: (id: string) => {}
})

function ScenesProvider(props: PropsWithChildren) {
    const [scenes, setScenes] = useState<ApiScene[]>([])
    const groupsContext = useLightGroupsContext();

    const getScenes = async (): Promise<ApiScene[]> => {
        const scenesResponse = await fetch(`${config.api.scenes}`)
        return await scenesResponse.json()
    }

    const activateSceneById = async (id: string): Promise<void> => {
        await fetch(`${config.api.scenes}/action`, {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify({
                type: "trigger-scene",
                sceneId: id
            } as ApiSceneAction)
        })
        await groupsContext.updateGroups()
    }

    useEffect(() => {
        getScenes().then(setScenes)
    }, [])

    return <ScenesContext.Provider value={{scenes: scenes, activateSceneById}}>{props.children}</ScenesContext.Provider>
}

function useScenesContext() {
    return useContext(ScenesContext);
}

export {
    useScenesContext,
    ScenesProvider
}