"use client"

import {TradfriScene} from "@/types/Tradfri";
import {Button, ImageButton} from "@/components/buttons/buttons";
import {activateScene} from "@/app/TradfriService";
import {useRouter} from "next/navigation";

export function SceneButton(props: { scene: TradfriScene }) {
    const router = useRouter()
    const handleClick = () => {
        activateScene(props.scene.id).then(() => router.refresh())
    }

    return <ImageButton
        label={props.scene.name}
        image={`/scenes/${props.scene.name}.jpg`}
        onClick={handleClick}
    />
}