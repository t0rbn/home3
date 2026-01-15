import {Button, ButtonProps} from "@/components/buttons/Buttons";
import styles from "./ButtonGroup.module.css"
import {PropsWithChildren} from "react";
import {cns} from "@/utils/cns";

export interface ButtonGroupProps {
    label?: string
    connected?: boolean;
    fullWidth?: boolean
}

export function ButtonGroup(props: PropsWithChildren<ButtonGroupProps>) {
    const classes = [
        styles.buttonGroup,
        props.connected ? styles.connected : null,
        props.fullWidth ? styles.fullWidth : null,
    ]

    return <div className={styles.buttonGroupWrapper}>
        {props.label && <label>{props.label}</label>}
        <div className={cns(...classes)}>{props.children}</div>
    </div>
}

