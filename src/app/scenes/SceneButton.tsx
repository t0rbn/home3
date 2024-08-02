"use client";

import {useRouter} from "next/navigation";
import ImageButton from "@/components/buttons/image-button/ImageButton";
import {TradfriScene} from "@/types/Tradfri";
import {activateScene} from "@/actions/tradfri-actions";

export function SceneButton(props: { scene: TradfriScene }) {
    const router = useRouter();

    const onClick = () => {
        activateScene(props.scene.id).then(router.refresh)
    }

    return <ImageButton
        image={`/scenes/${props.scene.name.replaceAll(' ', '%20')}.jpg`}
        key={props.scene.id}
        onClick={onClick}
        label={props.scene.name}
    />
}