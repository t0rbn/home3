"use client";

import {activateScene, getScenes} from "@/actions/tradfri-actions";
import {useEffect, useState} from "react";
import {TradfriApiScene} from "@/types/Tradfri";
import styles from "./page.module.css"
import {useRouter} from "next/navigation";
import {ListLayout} from "@/components/layout/Layouts";

export default function ScenesPage() {
    const router = useRouter()

    const [scenes, setScenes] = useState<Array<TradfriApiScene>>()
    useEffect(() => {getScenes().then(setScenes)}, [])

    return <div className={styles.scenesLayout}>
        {scenes?.map((scene, index) => <button
            key={scene.id}
            onClick={() => activateScene(scene.id).then(router.refresh)}
            className={styles.sceneButton}
        >
            <ListLayout>
                <div>
                    <img src={`/scenes/${scene.name}.jpg`} alt={scene.name}/>
                </div>
                <strong>{scene.name}</strong>
            </ListLayout>
        </button>)}
    </div>
}