import {useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";
import SubPageLayout from "../globals/SubPageLayout";
import {Link} from "react-router-dom";

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
            <div>
                <h1>{group.name}</h1>
                {group.lights.map(l => (<Link to={'/lights/' + l.id}>{l.name}</Link>))}
            </div>
        )
    }

    return (
        <SubPageLayout>
            {groups.map(g =>  lightsGroup(g) )}
        </SubPageLayout>
    )
}