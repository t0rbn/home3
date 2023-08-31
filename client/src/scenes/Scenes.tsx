import {useEffect, useState} from "react";
import {ApiScene} from "../../../shared/types/Scenes";
import {useScenesContext} from "./ScenesContext";
import Box from "../globals/box/Box";
import PrimaryButton from "../globals/primary-button/PrimaryButton";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";

export default function Scenes() {
    const [scenes, setScenes] = useState<Array<ApiScene>>([]);
    const context = useScenesContext();

    useEffect(() => {
        setScenes(context.scenes)
    }, [context.scenes]);

    if (!scenes.length) {
        return <div>Loading...</div>
    }
    return (
        <Box>
            <h1>Scenes</h1>
            <ContentGridLayout>
                {scenes.map(s => <PrimaryButton key={s.id} onClick={() => context.activateSceneById(s.id)}>{s.name}</PrimaryButton>)}
            </ContentGridLayout>
        </Box>
    )
}