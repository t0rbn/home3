"use client"

import {TradfriDevice, TradfriLight, TradfriPlug} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {startTransition, useOptimistic} from "react";
import {togglePlug} from "@/app/TradfriService";
import {Button} from "@/components/buttons/buttons";
import styles from "./device-controls.module.css"

export function DeviceButton(props: { device: TradfriDevice }) {
    if (props.device.type === 'light') {
        return <LightButton light={props.device}/>;
    }
    if (props.device.type === 'plug') {
        return <PlugButton plug={props.device}/>
    }
    return 'UNKNOWN TRADFRI DEVICE TYPE'
}

function LightButton(props: { light: TradfriLight }) {
    return <Button
        href={`devices/${props.light.id}`}
        icon="lightbulb_2"
        label={props.light.name}
        variant={props.light.brightness ? 'active' : 'default'}
        style={props.light.brightness ? {'--color-active': props.light.color} : {}}
        className={styles.deviceButton}
    />
}

function PlugButton(props: { plug: TradfriPlug }) {
    const router = useRouter();
    const [optimisticState, setOptimisticState] = useOptimistic(props.plug.isOn)

    const handleClick = () => startTransition(async () => {
        setOptimisticState(!optimisticState);
        await togglePlug(props.plug.id)
        router.refresh()
    })

    return <Button
        onClick={handleClick}
        label={props.plug.name}
        icon={optimisticState ? 'toggle_on' : 'toggle_off'}
        variant={optimisticState ? 'active' : 'default'}
        className={styles.deviceButton}
    />


}