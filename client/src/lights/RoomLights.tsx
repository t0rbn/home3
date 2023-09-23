import {useEffect, useState} from "react";
import {ApiLight, ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import {useParams} from "react-router-dom";
import LightControl from "./light-control/LightControl";
import ListLayout from "../globals/layouts/list-layout/ListLayout";

export default function RoomLights() {
    const groupId = useParams().id;

    const [group, setGroup] = useState<ApiLightsGroup>()
    const context = useLightGroupsContext();

    useEffect(() => {
        setGroup(context.lightGroups.find(g => g.id === groupId))
    }, [context.lightGroups, groupId]);

    const compareLights = (a: ApiLight, b: ApiLight) => {
        if (a.name === b.name) {
            return 0
        }
        return a.name < b.name ? -1 : 1
    }

    if (!group) {
        return <div>Loading...</div>
    }

    return (
        <AppLayout backButton>
            <ListLayout>
                <h1>{group.name}</h1>
                {group.lights.sort(compareLights).map(l => (<LightControl key={l.id} id={l.id}/>))}
                {!!group.lights.length || <h3>No active lights</h3>}
            </ListLayout>

        </AppLayout>
    )
}