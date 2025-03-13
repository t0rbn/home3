import {PropsWithChildren} from "react";
import styles from "./GridContainer.module.scss"

interface GridContainerProps {
    cols: number;
    colsMedium?: number;
}

export function GridContainer(props: PropsWithChildren<GridContainerProps>) {
    return <div
        className={styles.container}
        data-cols={props.cols}
        data-cols-medium={props.colsMedium ?? props.cols}
    >
        {props.children}
    </div>
}

export function GridSpacer() {
    return <div />
}
