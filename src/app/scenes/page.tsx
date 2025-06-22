"use client";

import {activateScene, getScenes} from "@/actions/tradfri-actions";
import {useEffect, useState} from "react";
import {TradfriApiScene} from "@/types/Tradfri";
import styles from "./page.module.css"
import {useRouter} from "next/navigation";

export default function ScenesPage() {
    const router = useRouter()

    const [scenes, setScenes] = useState<Array<TradfriApiScene>>()
    useEffect(() => {
        getScenes().then(setScenes)
    }, [])

    return <div className={styles.scenesContainer}>
        {scenes?.map((scene, index) => <button
            key={scene.id}
            onClick={() => activateScene(scene.id).then(router.refresh)}
            className={styles.sceneButton}
            style={{animationDelay: `${index * 50}ms`}}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`scenes/${scene.name}.jpg`} alt={scene.name}/>
            <span>{scene.name}</span>
        </button>)}
    </div>
}