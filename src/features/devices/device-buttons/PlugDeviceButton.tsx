"use client";

import {useRouter} from "next/navigation";
import {TradfriPlug} from "@/types/Tradfri";
import {togglePlug} from "@/actions/tradfri-actions";
import {DeviceButton} from "@/features/devices/device-buttons/DeviceButton";

interface PlugDeviceButtonProps {
    plug: TradfriPlug
}

export function PlugDeviceButton(props: PlugDeviceButtonProps) {
    const router = useRouter();

    const toggle = () => {
        togglePlug(props.plug.id).then(router.refresh)
    }

    return <DeviceButton isOn={props.plug.isOn} onClick={toggle} name={props.plug.name} icon="power"/>
}