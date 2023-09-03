import {useLightGroupsContext} from "../LightGroupsContext";
import React, {useEffect, useState} from "react";
import PrimaryButton from "../../globals/primary-button/PrimaryButton";
import Box from "../../globals/box/Box";
import {ApiLightsGroup} from "../../../../shared/types/Light";
import ContentGridLayout from "../../globals/layouts/content-grid-layout/ContentGridLayout";
import Spinner from "../../globals/spinner/Spinner";
import ListLayout from "../../globals/layouts/list-layout/ListLayout";

export default function LightsHomeHero() {
    const context = useLightGroupsContext();
    const [groups, setGroups] = useState<Array<ApiLightsGroup>>([]);

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    if (!groups?.length) {
        return <Box><Spinner/></Box>
    }

    return (
        <Box>
            <ListLayout space="big">
                <h1>Lights</h1>
                <ContentGridLayout variant="small-items">
                    {groups.map(g => <PrimaryButton href={'/lights/groups/' + g.id} key={g.id}>{g.name}</PrimaryButton>)}
                </ContentGridLayout>
            </ListLayout>
        </Box>
    )
}