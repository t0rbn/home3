import {useLightGroupsContext} from "../LightGroupsContext";
import React, {useEffect, useState} from "react";
import PrimaryButton from "../../globals/buttons/primary-button/PrimaryButton";
import {ApiLightsGroup} from "../../../../shared/types/Light";
import ContentGridLayout from "../../globals/layouts/content-grid-layout/ContentGridLayout";
import SpinnerBox from "../../globals/spinner/SpinnerBox";

export default function LightGroups() {
    const context = useLightGroupsContext();
    const [groups, setGroups] = useState<Array<ApiLightsGroup>>([]);

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    if (!groups?.length) {
        return <SpinnerBox/>
    }

    return (
        <ContentGridLayout>
            {groups.map(g => <PrimaryButton href={'/lights/groups/' + g.id} key={g.id}>{g.name}</PrimaryButton>)}
        </ContentGridLayout>
    )
}