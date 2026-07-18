"use client"

import {TradfriScene} from "@/types/Tradfri";
import {Button} from "@/components/buttons/buttons";
import {activateScene} from "@/app/TradfriService";
import {useRouter} from "next/navigation";

export function SceneButton(props: { scene: TradfriScene }) {
    const router = useRouter()
    const handleClick = () => {
        activateScene(props.scene.id).then(() => router.refresh())
    }

    return <Button label={props.scene.name} onClick={handleClick}/>
}