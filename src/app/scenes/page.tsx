"use client";

import {activateScene, getScenes} from "@/actions/tradfri-actions";
import {useEffect, useState} from "react";
import {TradfriScene} from "@/types/Tradfri";
import {MainActionButton} from "@/components/buttons/Buttons";
import {ListLayout} from "@/components/layout/Layouts";

export default function ScenesPage() {
    const [scenes, setScenes] = useState<Array<TradfriScene>>()
    useEffect(() => {
        getScenes().then(setScenes)
    }, [])

    return <ListLayout>
        {scenes?.map((scene) => <MainActionButton label={scene.name} key={scene.id} onClick={() => activateScene(scene.id)}/>)}
    </ListLayout>
}