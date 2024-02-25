import {getTradfriScenes} from "@/actions/tradfri-actions";
import {Metadata} from "next";
import {SceneButton} from "@/app/scenes/scene-button";

export const metadata: Metadata = {
    title: "scenes - home3",
};

export default async function ScenesPage() {
    const scenes = await getTradfriScenes();

    return <div>
        {scenes.map(s => <SceneButton key={s.id} scene={s}/>)}
    </div>

}

export const dynamic = 'force-dynamic'