import {useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import {useParams} from "react-router-dom";
import LightControl from "./light-control/LightControl";

export default function LightsOverview() {
    const groupId = useParams().id;

    const [group, setGroup] = useState<ApiLightsGroup>()
    const context = useLightGroupsContext();

    useEffect(() => {
        setGroup(context.lightGroups.find(g => g.id === groupId))
    }, [context.lightGroups]);

    if (!group) {
        return <div>Loading...</div>
    }

    return (
        <AppLayout name={group.name}>
            {group.lights.map(l => (<LightControl id={l.id}/>))}
        </AppLayout>
    )
}