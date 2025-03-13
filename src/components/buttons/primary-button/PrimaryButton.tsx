import {PropsWithChildren} from "react";
import styles from "./PrimaryButton.module.scss"
import {cns} from "@/utils/cns";

export interface PrimaryButtonProps {
    onClick?: () => any
    className?: string
    style?: object
}


export default function PrimaryButton(props: PropsWithChildren<PrimaryButtonProps>) {
    return (
        <button className={cns(styles.button, props.className)} onClick={props.onClick} style={props.style}>
            {props.children}
        </button>
    )
}
