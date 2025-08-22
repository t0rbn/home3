"use client";

import {Icon} from "@/components/icon/Icon";
import styles from "./Buttons.module.css"
import {cns} from "@/utils/cns";
import Link from "next/link";

export interface ButtonProps {
    label?: string,
    icon?: string,
    onClick: () => void,
    className?: string
    color?: string;
}


export function Button(props: ButtonProps) {
    return <button
        className={styles.button}
        onClick={props.onClick}
        style={{backgroundColor: props.color}}
    >
        {props.icon ? <Icon icon={props.icon} className={styles.icon}/> : null}
        {props.label ?? null}
    </button>
}

export interface ButtonGroupProps {
    label?: string
    connected?: boolean;
    fullWidth?: boolean
    buttons: Array<ButtonProps & { key?: string }>;
}

export function ButtonGroup(props: ButtonGroupProps) {
    return <div className={cns(styles.buttonGroup, props.connected ? styles.connected : null, props.fullWidth ? styles.fullWidth : null)}>
        {props.label ? <label>{props.label}</label> : null}
        <div>
            {props.buttons.map((button) => (
                <Button
                    {...button}
                    key={button.key || `${button.label}${button.key}`}
                    className={props.connected ? styles.connectedButton : undefined}
                />)
            )}
        </div>
    </div>
}

export function MainActionButton(props: ButtonProps & { isActive?: boolean }) {
    return <button className={cns(styles.mainActionButton, props.isActive ? styles.active : null)} onClick={props.onClick} style={{backgroundColor: props.color}}>
        {props.icon ? <Icon icon={props.icon} className={styles.icon}/> : null}
        {props.label ?? null}
    </button>
}

interface DeviceLinkButtonProps {
    icon: string,
    name: string,
    status: string
    href: string,
    isActive: boolean,
}

export function DeviceLinkButton(props: DeviceLinkButtonProps) {
    return <Link href={props.href} className={cns(styles.deviceLinkButton, props.isActive ? styles.isActive : null)}>
        <Icon icon={props.icon} className={styles.icon}/>
            <strong>{props.name}</strong>
            <div>{props.status}</div>
    </Link>
}