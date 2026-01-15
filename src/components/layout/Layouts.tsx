import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import {cns} from "@/utils/cns";

function ClassedContainer(props: PropsWithChildren<{ className: string }>) {
    return <div className={props.className}>{props.children}</div>
}

export function ListLayout(props: PropsWithChildren<{largeGap?: boolean}>) {
    return <ClassedContainer className={cns(styles.listLayout, props.largeGap ? styles.large : undefined)}>{props.children}</ClassedContainer>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <ClassedContainer className={styles.horizontalCenterLayout}>{props.children}</ClassedContainer>
}