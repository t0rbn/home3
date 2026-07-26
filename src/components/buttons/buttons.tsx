"use client";

import styles from "./buttons.module.css"
import {cns} from "@/utils/cns";
import Link from "next/link";
import {PropsWithChildren} from "react";
import {Icon} from "@/components/icon/icon";

export type BaseButtonProps = {
    ariaLabel?: string,
    className?: string
    style?: any,
    isActive?: boolean,
} & ({
    href: string,
    scroll?: boolean,
    onClick?: never,
} | {
    onClick: () => void;
    href?: never,
})

function BaseButton(props: PropsWithChildren<BaseButtonProps>) {
    const commonProps = {
        'aria-label': props.ariaLabel,
        className: cns(styles.baseButton, [styles.active, !!props.isActive], props.className),
        style: props.style,
    }

    if (props.href) {
        return <Link href={props.href} scroll={props.scroll} {...commonProps}>{props.children}</Link>
    }
    if (props.onClick) {
        return <button onClick={() => props.onClick()} {...commonProps}>{props.children}</button>
    }
    return null
}

interface IconButtonProps {
    icon?: string
    ariaLabel: string,
}

export function IconButton(props: BaseButtonProps & IconButtonProps) {
    const {icon, ariaLabel, className, ...baseProps} = props
    const allClasses = cns(styles.defaultButton, className)

    return <BaseButton {...baseProps} ariaLabel={ariaLabel} className={allClasses}>
        {icon ? <Icon icon={icon} className={styles.defaultButtonIcon} variant={props.isActive ? 'filled' : 'outlined'}/> : <span>&nbsp;</span>}
    </BaseButton>
}

interface ImageButtonProps {
    image: string,
    label: string
}

export function ImageButton(props: BaseButtonProps & ImageButtonProps) {
    const {image, label, className, ...baseProps} = props
    const allClasses = cns(styles.imageButton, className)

    return <BaseButton {...baseProps} ariaLabel={props.label} className={allClasses} style={{'--image-bg': `url("${image}")`}}>
        <label>{props.label}</label>
    </BaseButton>
}

interface StateButtonProps {
    icon: string,
    label: string,
    statusLine?: string
}

export function StateButton(props: BaseButtonProps & StateButtonProps) {
    const {icon, label, statusLine, className, ...baseProps} = props
    return <BaseButton {...baseProps} className={cns(styles.stateButton, className)} ariaLabel={`${label}: ${statusLine}`}>
        <div className={styles.stateButtonIconContainer}>
            <Icon icon={icon} className={styles.stateButtonIcon} variant={props.isActive ? 'filled' : 'outlined'}/>
        </div>
            <strong>{label}</strong>
            <span>{statusLine}</span>

    </BaseButton>
}
