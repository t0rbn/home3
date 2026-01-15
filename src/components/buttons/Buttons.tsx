"use client";

import {Icon} from "@/components/icon/Icon";
import styles from "./Buttons.module.css"
import {cns} from "@/utils/cns";

export interface ButtonProps {
    label?: string,
    icon?: string,
    image?: string,
    size?: 'default' | 'huge'
    variant?: 'default' | 'text' | 'outline',
    onClick: () => void,
    className?: string
    style?: any,
}


export function Button(props: ButtonProps) {
    const classNames = [
        styles.button,
        props.variant === 'text' ? styles.text : undefined,
        props.variant === 'outline' ? styles.outline : undefined,
        props.size === 'huge' ? styles.huge : undefined,
        props.className
    ]
    return <button
        onClick={props.onClick}
        className={cns(...classNames)}
        style={props.style}
    >
        {props.image ? <img src={props.image} alt={props.label} className={styles.image}/> : null}
        {props.icon ? <Icon icon={props.icon} className={styles.icon}/> : null}
        {props.label ?? null}
    </button>
}

export interface ButtonGroupProps {
    label?: string
    connected?: boolean;
    fullWidth?: boolean
    buttons: Array<ButtonProps>;
}

export function ButtonGroup(props: ButtonGroupProps) {
    return <div>
        IMPLEMENT ME
    </div>
}


