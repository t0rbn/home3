import React, {useEffect, useState} from "react";
import {ApiScene} from "../../../shared/types/Scenes";
import {useScenesContext} from "./ScenesContext";
import Box from "../globals/box/Box";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";
import ImageButton from "../globals/image-button/ImageButton";
import SpinnerBox from "../globals/spinner/SpinnerBox";
import ListLayout from "../globals/layouts/list-layout/ListLayout";

export default function Scenes() {
    const [scenes, setScenes] = useState<Array<ApiScene>>([]);
    const context = useScenesContext();

    useEffect(() => {
        setScenes(context.scenes)
    }, [context.scenes]);

    if (!context.scenes) {
        return <SpinnerBox/>
    }

    return (
        <Box>
            <ListLayout space="big">
                <h1>Scenes</h1>
                <ContentGridLayout>
                    {scenes.map(s => <ImageButton image={`/scenes/${s.name.replaceAll(' ', '%20')}.jpg`} key={s.id} onClick={() => context.activateSceneById(s.id)} label={s.name}/>)}
                </ContentGridLayout>
            </ListLayout>
        </Box>
    )
}