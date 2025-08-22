import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"

function ClassedContainer(props: PropsWithChildren<{className: string}>) {
    return <div className={props.className}>{props.children}</div>
}

export function ListLayout(props: PropsWithChildren) {
    return <ClassedContainer className={styles.listLayout}>{props.children}</ClassedContainer>
}

export function GridLayout(props: PropsWithChildren) {
    return <ClassedContainer className={styles.gridLayout}>{props.children}</ClassedContainer>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <ClassedContainer className={styles.horizontalCenterLayout}>{props.children}</ClassedContainer>
}