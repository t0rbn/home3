import {PropsWithChildren} from "react";
import styles from './box.module.css'

export default function Box(props: PropsWithChildren) {
    return (
        <div className={styles.box}>
            {props.children}
        </div>
    )
}