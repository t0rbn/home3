import {useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import Box from "../globals/box/Box";
import PrimaryButton from "../globals/primary-button/PrimaryButton";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";

export default function LightsOverview() {
    const [groups, setGroups] = useState<Array<ApiLightsGroup>>([])
    const context = useLightGroupsContext();

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    if (!groups?.length) {
        return <div>Loading...</div>
    }

    const lightsGroup = (group: ApiLightsGroup) => {
        return (
            <Box>
                <h1>{group.name}</h1>
                <ContentGridLayout>
                    {group.lights.map(l => (<PrimaryButton href={'/lights/' + l.id}>{l.name}</PrimaryButton>))}
                </ContentGridLayout>
            </Box>
        )
    }

    return (
        <AppLayout name="Lights">
            {groups.map(g => lightsGroup(g))}
        </AppLayout>
    )
}