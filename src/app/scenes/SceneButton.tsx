"use client";

import {activateTradfriScene} from "@/actions/tradfri-actions";
import {TradfriScene} from "@/types/Scenes";
import {useRouter} from "next/navigation";
import ImageButton from "@/components/buttons/image-button/ImageButton";

export function SceneButton(props: { scene: TradfriScene }) {
    const router = useRouter();

    const onClick = () => {
        activateTradfriScene(props.scene.id).then(() => router.refresh())
    }

    return <ImageButton
        image={`/scenes/${props.scene.name.replaceAll(' ', '%20')}.jpg`}
        key={props.scene.id}
        onClick={onClick}
        label={props.scene.name}
    />
}