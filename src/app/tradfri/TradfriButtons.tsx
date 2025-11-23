"use client";

import {PropsWithChildren, useCallback} from "react";
import Link from "next/link";
import {cns} from "@/utils/cns";
import {Icon} from "@/components/icon/Icon";
import {TradfriApiPlug} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {togglePlug} from "@/actions/tradfri-actions";
import styles from "./TradfriButtons.module.css"

interface DeviceControlButtonProps {
    icon: string,
    name: string,
    status: string
    href?: string,
    onClick?: () => void
    isActive: boolean,
}

export function DeviceControlButton(props: DeviceControlButtonProps) {
    function Container(inProps: PropsWithChildren) {
        if (props.href) {
            return <Link href={props.href} className={cns(styles.deviceLinkButton, props.isActive ? styles.isActive : null)}>{inProps.children}</Link>
        }
        return <button onClick={props.onClick} className={cns(styles.deviceLinkButton, props.isActive ? styles.isActive : null)}>{inProps.children}</button>
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