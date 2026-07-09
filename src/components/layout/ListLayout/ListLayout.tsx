import {PropsWithChildren} from "react";
import styles from "./ListLayout.module.css"
import {cns} from "@/utils/cns";

export function ListLayout(props: PropsWithChildren<{ largeGap?: boolean }>) {
    const classNames = [
        styles.listLayout,
        props.largeGap ? styles.large : undefined,
    ]
    return <div key="foo" className={cns(...classNames)}>{props.children}</div>
}
