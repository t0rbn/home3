"use client";

import {TradfriDevice, TradfriLight, TradfriPlug} from "@/types/Tradfri";
import {IconButton, StateButton} from "@/components/buttons/buttons";
import {startTransition, useOptimistic} from "react";
import {useRouter} from "next/navigation";
import {togglePlug} from "@/app/TradfriService";
import styles from "./page.module.css"
import {cns} from "@/utils/cns";

function PlugButton(props: { plug: TradfriPlug }) {
    const router = useRouter();
    const [optimisticOn, setOptimisticOn] = useOptimistic(props.plug.isOn)

    const handleClick = () => startTransition(async () => {
        setOptimisticOn(!optimisticOn);
        await togglePlug(props.plug.id)
        router.refresh()
    })

    return <StateButton
        onClick={handleClick}
        label={props.plug.name}
        statusLine={optimisticOn ? 'on' : 'off'}
        icon={optimisticOn ? 'toggle_on' : 'toggle_off'}
        isActive={optimisticOn}
    />

}

function LightButton(props: { light: TradfriLight }) {
    return <StateButton
        className={cns([styles.lightButton, props.light.brightness > 0])}
        href={`/${props.light.id}`}
        label={props.light.name}
        statusLine={props.light.brightness ? (`${Math.round(100 * props.light.brightness)}%`) : 'off'}
        icon="lightbulb_2"
        isActive={props.light.brightness > 0}
        style={{'--light-color': props.light.color}}
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