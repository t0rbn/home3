"use client";

import {PropsWithChildren, useCallback} from "react";
import Link from "next/link";
import {cns} from "@/utils/cns";
import {Icon} from "@/components/icon/Icon";
import {TradfriApiGroup, TradfriApiPlug} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {togglePlug} from "@/actions/tradfri-actions";
import styles from "./TradfriButtons.module.css"
import {ListLayout} from "@/components/layout/Layouts";

interface DeviceControlButtonProps {
    icon: string,
    name: string,
    status: string
    href?: string,
    onClick?: () => void
    isActive: boolean,
    activeColor?: string,
}

export function DeviceControlButton(props: DeviceControlButtonProps) {
    const sanitizedColor = props.activeColor?.startsWith("#") ? props.activeColor : `#${props.activeColor}`
    const style = (props.activeColor && props.isActive) ? {'--activeColor': sanitizedColor} : undefined

    function Container(inProps: PropsWithChildren) {
        if (props.href) {
            return <Link href={props.href} className={cns(styles.deviceLinkButton, props.isActive ? styles.isActive : null)} style={style as any}>{inProps.children}</Link>
        }
        return <button onClick={props.onClick} className={cns(styles.deviceLinkButton, props.isActive ? styles.isActive : null)} style={style as any}>{inProps.children}</button>
    }

    return <Container>
        <div className={styles.text}>
            <strong>{props.name}</strong>
            <div>{props.status}</div>
        </div>

        <div className={styles.iconContainer}>
            <Icon icon={props.icon} className={styles.icon}/>
        </div>


    </Container>
}

export function PlugControlButton(props: { plug: TradfriApiPlug }) {
    const router = useRouter()
    const toggle = useCallback(() => togglePlug(props.plug.id).then(() => router.refresh()), [router, props.plug.id])

    return <DeviceControlButton onClick={toggle} icon="power" isActive={props.plug.isOn} status={props.plug.isOn ? 'on' : 'off'} name={props.plug.name}/>
}

export function TradfriButtonGroup(props: { group: TradfriApiGroup }) {
    const devices = [
        ...props.group.lights.map(l => ({name: l.name, component: <DeviceControlButton activeColor={l.color} icon="lightbulb_2" name={l.name} status={l.brightness ? `${Math.round(100 * l.brightness)}%` : 'off'} href={`/tradfri/lights/${l.id}`} isActive={!!l.brightness} key={l.id}/>})),
        ...props.group.plugs.map(p => ({name: p.name, component: <PlugControlButton plug={p}/>}))
    ]

    return <ListLayout>
        <h1>{props.group.name}</h1>
        <div className={styles.buttonGroupContainer}>
            {devices.sort((a, b) => a.name.localeCompare(b.name)).map(d => d.component)}
        </div>
    </ListLayout>
}
