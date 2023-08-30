"use client";
// import Image from 'next/image'
// @ts-ignore

import {useEffect, useState} from "react";
import {ApiScene} from "../../../../shared/types/Scenes";
import {useScenesContext} from "@/app/scenes/ScenesContext";

export default function Scenes() {

    const [scenes, setScenes] = useState<Array<ApiScene>>([]);
    const context = useScenesContext();

    useEffect(() => {
        setScenes(context.scenes)
    }, [context.scenes]);

    return (
        <div>
            <h1>PUT SCENES HERE</h1>
            {scenes.map(s => (<button onClick={() => context.activateSceneById(s.id)} key={s.id}>{s.name}</button>))}
        </div>
    )
}
