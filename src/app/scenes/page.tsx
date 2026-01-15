"use client";

import {activateScene, getScenes} from "@/actions/tradfri-actions";
import {useEffect, useState} from "react";
import {TradfriApiScene} from "@/types/Tradfri";
import styles from "./page.module.css"
import {useRouter} from "next/navigation";
import {ListLayout} from "@/components/layout/Layouts";
import {Button} from "@/components/buttons/Buttons";

export default function ScenesPage() {
    const router = useRouter()

    const [scenes, setScenes] = useState<Array<TradfriApiScene>>()
    useEffect(() => {getScenes().then(setScenes)}, [])

    return <div className={styles.scenesLayout}>
        {scenes?.map((s) => <Button
            key={s.id}
            onClick={() => activateScene(s.id).then(router.refresh)}
            image={`/scenes/${s.name}.jpg`}
            label={s.name}
            size="huge"
        />)}
    </div>
}