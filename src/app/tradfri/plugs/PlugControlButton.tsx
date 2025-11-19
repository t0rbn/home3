"use client"

import {useRouter} from "next/navigation";
import {useCallback} from "react";
import {togglePlug} from "@/actions/tradfri-actions";
import {DeviceControlButton} from "@/components/buttons/Buttons";
import {TradfriApiPlug} from "@/types/Tradfri";

export function PlugControlButton(props: { plug: TradfriApiPlug }) {
    const router = useRouter()
    const toggle = useCallback(() => togglePlug(props.plug.id).then(() => router.refresh()), [router, props.plug.id])

    return <DeviceControlButton onClick={toggle} icon="power" isActive={props.plug.isOn} status={props.plug.isOn ? 'on' : 'off'} name={props.plug.name}/>

}