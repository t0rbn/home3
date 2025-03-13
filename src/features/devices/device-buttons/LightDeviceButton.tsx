"use client";

import {useRouter} from "next/navigation";
import {TradfriLight} from "@/types/Tradfri";
import {DeviceButton} from "@/features/devices/device-buttons/DeviceButton";

interface LightDeviceButtonProps {
    light: TradfriLight
}

export function LightDeviceButton(props: LightDeviceButtonProps) {
    const router = useRouter();
    const openDetails = () => router.push(`/lights/${props.light.id}`);

    return <DeviceButton isOn={props.light.brightness > 0} onClick={openDetails} name={props.light.name} icon="lightbulb"/>
}