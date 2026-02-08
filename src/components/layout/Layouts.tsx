import {PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import animations from "@/animations.module.css"
import {cns} from "@/utils/cns";

interface ListLayoutProps {
    largeGap?: boolean
    animated?: boolean
}

export function ListLayout(props: PropsWithChildren<ListLayoutProps>) {
    const classNames = [
        styles.listLayout,
        props.largeGap ? styles.large : undefined,
        props.animated ? animations.animationPopFade : undefined,
        props.animated ? animations.animationStaggered : undefined
    ]
    return <div className={cns(...classNames)}>{props.children}</div>
}

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <div className={styles.horizontalCenterLayout}>{props.children}</div>
}