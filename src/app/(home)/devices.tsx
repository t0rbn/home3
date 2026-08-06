"use client";

import {TradfriDevice, TradfriGroup, TradfriLight, TradfriPlug} from "@/types/tradfri";
import {IconButton, StateButton} from "@/components/buttons/buttons";
import {startTransition, useOptimistic} from "react";
import {useRouter} from "next/navigation";
import {togglePlug} from "@/app/tradfri-service";
import styles from "./page.module.css"
import {cns} from "@/utils/cns";
import {List} from "@/components/layout/layouts";

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
        href={`/${props.light.id}`}
        scroll={false}
        label={props.light.name}
        statusLine={props.light.brightness ? (`${Math.round(100 * props.light.brightness)}%`) : 'off'}
        icon="lightbulb_2"
        isActive={props.light.brightness > 0}
        activeColor={props.light.color}
    />
}

function DeviceButton(props: { device: TradfriDevice }) {
    if (props.device.type === 'light') {
        return <LightButton light={props.device}/>
    }

    if (props.device.type === 'plug') {
        return <PlugButton plug={props.device}/>
    }

    throw new Error('Unsupported device type')
}

export function Devices(props: {groups: Array<TradfriGroup>}) {
    return <List bigSpace>
        {
            props.groups
                .sort((a,b) => b.devices.length - a.devices.length)
                .map(group => <List key={group.id}>
                    <h1>{group.name}</h1>
                    <List className={styles.deviceList}>
                        {group.devices.map(d => <DeviceButton device={d} key={d.id} />)}
                    </List>
                </List>)
        }
    </List>
}