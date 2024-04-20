import {getTradfriScenes} from "@/actions/tradfri-actions";
import {Metadata} from "next";
import {SceneButton} from "@/app/scenes/SceneButton";
import {GridContainer} from "@/components/containers/grid/GridContainer";

export const metadata: Metadata = {
    title: "Scenes - home3",
};

export default async function ScenesPage() {
    const scenes = await getTradfriScenes();

    return <GridContainer cols={3} colsMedium={2}>
        {scenes.map(s => <SceneButton scene={s} key={s.id}/>)}
    </GridContainer>
}

export const dynamic = 'force-dynamic'