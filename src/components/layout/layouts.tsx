import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import {cns} from "@/utils/cns";

export function GridLayout(props: PropsWithChildren) {
    return <div className={styles.gridLayout}>
        {props.children}
    </div>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <div className={styles.horizontalCenterLayout}>{props.children}</div>
}

export function ListLayout(props: PropsWithChildren<{ largeGap?: boolean }>) {
    const classNames = [
        styles.listLayout,
        props.largeGap ? styles.large : undefined,
    ]
    return <div key="foo" className={cns(...classNames)}>{props.children}</div>
}
