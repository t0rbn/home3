"use client"

import {TradfriScene} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";
import {activateScene} from "@/app/tradfri/TradfriService";

export function SceneButton(props: { scene: TradfriScene }) {
    const router = useRouter()

    const handleClick = async () => {
        activateScene(props.scene.id).then(() => router.refresh())
    }

    return <Button
        key={props.scene.id}
        onClick={handleClick}
        image={`/scenes/${props.scene.name}.jpg`}
        label={props.scene.name}
    />
}