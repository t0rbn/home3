import {getScenes} from "@/actions/tradfri-actions";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import {SceneButton} from "@/features/scenes/SceneButton";

export default async function SceneSelector() {
    const scenes = await getScenes()

    return <GridContainer cols={4} colsMedium={2}>
        {scenes.map(s => <SceneButton scene={s} key={s.id}/>)}
    </GridContainer>
}
