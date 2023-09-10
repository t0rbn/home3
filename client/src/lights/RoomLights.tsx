import {useEffect, useState} from "react";
import {ApiLight, ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import {useParams} from "react-router-dom";
import LightControl from "./light-control/LightControl";

export default function RoomLights() {
    const groupId = useParams().id;

    const [group, setGroup] = useState<ApiLightsGroup>()
    const context = useLightGroupsContext();

    useEffect(() => {
        setGroup(context.lightGroups.find(g => g.id === groupId))
    }, [context.lightGroups, groupId]);

    const compareLights = (a: ApiLight, b: ApiLight) => {
        if ((a.brightness === 0) === (b.brightness === 0)) {
            if (a.name === b.name) {
                return 0
            }
            return a.name < b.name ? -1 : 1
        }
        return a.brightness ? -1 : 1
    }

    if (!group) {
        return <div>Loading...</div>
    }

    return (
        <AppLayout name={group.name}>
            {group.lights.sort(compareLights).map(l => (<LightControl id={l.id}/>))}
        </AppLayout>
    )
}