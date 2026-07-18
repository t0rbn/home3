"use client";

import {TradfriDevice, TradfriLight, TradfriPlug} from "@/types/Tradfri";
import {Button} from "@/components/buttons/buttons";
import {startTransition, useOptimistic, useState} from "react";
import {useRouter} from "next/navigation";
import {togglePlug} from "@/app/TradfriService";

function PlugButton(props: { plug: TradfriPlug }) {
    const router = useRouter();
    const [optimisticOn, setOptimisticOn] = useOptimistic(props.plug.isOn)

    const handleClick = () => startTransition(async () => {
        setOptimisticOn(!optimisticOn);
        await togglePlug(props.plug.id)
        router.refresh()
    })

    return <Button
        onClick={handleClick}
        label={props.plug.name}
        icon={optimisticOn ? 'toggle_on' : 'toggle_off'}
        isActive={optimisticOn}
    />

}

function LightButton(props: { light: TradfriLight }) {
    return <Button
        href={`/${props.light.id}`}
        label={props.light.name}
        icon="lightbulb_2"
        isActive={props.light.brightness > 0}
        style={{'--color-active': props.light.color}}
    />
}

export function DeviceButton(props: { device: TradfriDevice }) {
    if (props.device.type === 'light') {
        return <LightButton light={props.device}/>
    }

    if (props.device.type === 'plug') {
        return <PlugButton plug={props.device}/>
    }

    throw new Error('Unsupported device type')
}