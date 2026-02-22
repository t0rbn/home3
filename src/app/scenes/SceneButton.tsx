"use client"

import {TradfriApiScene} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";
import {apiUrl} from "@/utils/apiUrl";

export function SceneButton(props: { scene: TradfriApiScene }) {
    const router = useRouter()
    const handleClick = async () => {
        await fetch(apiUrl('/tradfri/api/scenes/'), {method: 'POST', body: `${props.scene.id}`})
        router.refresh()
    }

    return <Button
        key={props.scene.id}
        onClick={handleClick}
        image={`/scenes/${props.scene.name}.jpg`}
        label={props.scene.name}
        size="huge"
    />
}