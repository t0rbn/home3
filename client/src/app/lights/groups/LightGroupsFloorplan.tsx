"use client";

import {useLightGroupsContext} from "@/app/lights/LightGroupsContext";
import {useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../../../shared/types/Light";
import Link from "next/link";

export default function LightGroupsFloorplan() {

    const context = useLightGroupsContext();
    const  [groups, setGroups] = useState<Array<ApiLightsGroup>>([]);

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    return (
        groups.map(g => <Link key={g.id}  href={'/lights/groups/' + g.id}>{g.name}</Link> )
    )
}