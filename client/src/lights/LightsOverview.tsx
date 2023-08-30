import {useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../shared/types/Light";
import {useLightGroupsContext} from "./LightGroupsContext";

export default function LightGroups() {
    const [groups, setGroups] = useState<Array<ApiLightsGroup>>([])
    const context = useLightGroupsContext();

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    if (!groups?.length) {
        return <div>Loading...</div>
    }
    return (
        <div>
            {groups.map(g => <button key={g.id}>{g.name}</button> )}
        </div>
    )
}