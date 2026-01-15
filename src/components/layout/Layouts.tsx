import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import {cns} from "@/utils/cns";

export function ListLayout(props: PropsWithChildren<{largeGap?: boolean}>) {
    return <div className={cns(styles.listLayout, props.largeGap ? styles.large : undefined)}>{props.children}</div>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <div className={styles.horizontalCenterLayout}>{props.children}</div>
}