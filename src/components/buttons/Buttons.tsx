"use client";

import {Icon} from "@/components/icon/Icon";
import styles from "./Buttons.module.css"
import {cns} from "@/utils/cns";
import Link from "next/link";

export type ButtonProps = {
    label?: string,
    ariaLabel?: string,
    icon?: string,
    image?: string,
    variant?: 'default' | 'text' | 'active',
    className?: string
    style?: any,
} & ({
    href: string,
    onClick?: never,
} | {
    onClick: () => void;
    href?: never,
})

export function Button(props: ButtonProps) {
    const classNames = [
        styles.button,
        props.variant === 'text' ? styles.text : undefined,
        props.variant === 'active' ? styles.active : undefined,
        props.className
    ]

    const content = <>
        {props.image ? <img src={props.image} alt={props.label} className={styles.image}/> : null}
        {props.icon ? <Icon icon={props.icon} className={styles.icon}/> : null}
        {props.label ?? null}
    </>

    const spreadProps = {
        className: cns(...classNames),
        style: props.style,
    }

    if (props.href) {
        return <Link href={props.href} {...spreadProps} aria-label={props.ariaLabel}>{content}</Link>
    }
    if (props.onClick) {
        return <button onClick={() => props.onClick()} {...spreadProps} aria-label={props.ariaLabel}>{content}</button>
    }
    return null
}


