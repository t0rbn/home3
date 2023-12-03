import {CSSProperties, PropsWithChildren} from "react";
import styles from './content-grid-layout.module.css'

interface ContentGridLayoutProps {
    cols?: number,
    colsSmall?: number,
}

export default function ContentGridLayout(props: PropsWithChildren<ContentGridLayoutProps>) {

    const cols = {
        '--cols-count': props.cols || 4,
        '--cols-count-small': props.colsSmall || 2
    } as CSSProperties


    return <div className={styles.layout} style={cols}>{props.children}</div>
}