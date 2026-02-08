"use client"

import {TradfriApiScene} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";
import {activateScene} from "@/actions/tradfri-actions";

export function SceneButton(props: { scene: TradfriApiScene }) {
    const router = useRouter()

    return <Button
        key={props.scene.id}
        onClick={() => activateScene(props.scene.id).then(router.refresh)}
        image={`/scenes/${props.scene.name}.jpg`}
        label={props.scene.name}
        size="huge"
    />
}