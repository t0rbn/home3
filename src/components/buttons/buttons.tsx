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
        return <Link href={props.href} {...commonProps}>{props.children}</Link>
    }
    if (props.onClick) {
        return <button onClick={() => props.onClick()} {...commonProps}>{props.children}</button>
    }
    return null
}

interface DefaultButtonProps {
    icon?: string,
    label?: string,
}
export function Button(props: BaseButtonProps & DefaultButtonProps) {
    const {icon, label, className, ...baseProps} = props

    const allClasses = cns(
        styles.defaultButton,
        className
    )

    return <BaseButton {...baseProps} ariaLabel={props.label ?? baseProps.ariaLabel} className={allClasses}>
        {icon && <Icon icon={icon} className={styles.defaultButtonIcon}/>}
        {label && <label>{label}</label>}
        {(!label && !icon) && <>&nbsp;</>}
    </BaseButton>
}
