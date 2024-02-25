"use client";

import {activateTradfriScene} from "@/actions/tradfri-actions";
import {TradfriScene} from "@/types/Scenes";
import {useRouter} from "next/navigation";

export function SceneButton(props: {scene: TradfriScene}) {
    const router = useRouter();

    const onClick = () => {
        activateTradfriScene(props.scene.id).then(() => router.refresh())
    }

    return <button onClick={onClick}>
        {props.scene.name}
    </button>
}