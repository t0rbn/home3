import styles from "./button-group.module.css"
import {PropsWithChildren} from "react";

export interface ButtonGroupProps {
    label?: string

}

export function ButtonGroup(props: PropsWithChildren<ButtonGroupProps>) {
    return <div className={styles.buttonGroupWrapper}>
        {props.label && <label>{props.label}</label>}
        <div className={styles.buttonGroup}>{props.children}</div>
    </div>
}

