import {SceneButton} from "@/app/scenes/scene-button";
import {GridLayout} from "@/components/layout/layouts";
import {getScenes} from "@/app/TradfriService";
import {connection} from "next/server";

export default async function ScenesPage() {
    await connection();
    const scenes = await getScenes()

    return <GridLayout>
        {scenes.map(s => <SceneButton scene={s} key={s.id}/>)}
    </GridLayout>

}