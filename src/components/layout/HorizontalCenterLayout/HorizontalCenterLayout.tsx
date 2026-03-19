import {PropsWithChildren} from "react";
import styles from "./HorizontalCenterLayout.module.css"

export function HorizontalCenterLayout(props: PropsWithChildren) {
    return <div className={styles.horizontalCenterLayout}>{props.children}</div>
}
