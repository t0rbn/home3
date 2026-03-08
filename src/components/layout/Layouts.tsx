import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import {cns} from "@/utils/cns";

export function ListLayout(props: PropsWithChildren<{largeGap?: boolean, animated?: boolean}>) {
    const classNames = [
        styles.listLayout,
        props.largeGap ? styles.large : undefined,
        props.animated ? styles.animated : undefined,
    ]
    return <div className={cns(...classNames)}>{props.children}</div>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <div className={styles.horizontalCenterLayout}>{props.children}</div>
}