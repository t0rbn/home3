"use client";

import {PropsWithChildren} from "react";
import styles from "./PrimaryButton.module.scss"
import {cns} from "@/utils/cns";

export interface PrimaryButtonProps {
    onClick?: () => any;
    style?: object;
    className?: string;
}

export default function PrimaryButton(props: PropsWithChildren<PrimaryButtonProps>) {

    const handle = () => {
        if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <button className={cns(styles.button, props.className)} onClick={handle} style={props.style}>
            {props.children}
        </button>
    )
}
