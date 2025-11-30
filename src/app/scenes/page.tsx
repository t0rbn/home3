"use client";

import {activateScene, getScenes} from "@/actions/tradfri-actions";
import {useEffect, useState} from "react";
import {TradfriApiScene} from "@/types/Tradfri";
import styles from "./page.module.css"
import {useRouter} from "next/navigation";
import {GridLayout, ListLayout} from "@/components/layout/Layouts";

export default function ScenesPage() {
    const router = useRouter()

    const [scenes, setScenes] = useState<Array<TradfriApiScene>>()
    useEffect(() => {getScenes().then(setScenes)}, [])

    return <GridLayout>
        {scenes?.map((scene, index) => <button
            key={scene.id}
            onClick={() => activateScene(scene.id).then(router.refresh)}
            className={styles.sceneButton}
            // style={{animationDelay: `${index * 50}ms`, backgroundImage: `url("/scenes/${scene.name}.jpg")`}}
        >
            <img src={`/scenes/${scene.name}.jpg`} alt={scene.name}/>
            <strong>{scene.name}</strong>

            <img src={`/scenes/${scene.name}.jpg`} alt={scene.name} className={styles.backgroundImage}/>
            <div className={styles.gradient} />
        </button>)}
    </GridLayout>
}