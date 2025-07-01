"use client";

import {TradfriPlug} from "@/types/Tradfri";
import {MainActionButton} from "@/components/buttons/Buttons";
import {togglePlug} from "@/actions/tradfri-actions";
import {useRouter} from "next/navigation";
import {useCallback} from "react";
import {HorizontalCenterLayout, ListLayout} from "@/components/layout/Layouts";

export function PlugControlPageContent(props: { plug: TradfriPlug }) {
    const router = useRouter()

    const toggle = useCallback(() => togglePlug(props.plug.id).then(() => router.refresh()), [router, props.plug.id])

    return <ListLayout>
        <HorizontalCenterLayout>
            <MainActionButton onClick={toggle} icon="power" isActive={props.plug.isOn}></MainActionButton>
            <h1>{props.plug.name}</h1>
        </HorizontalCenterLayout>
    </ListLayout>

}