import {PropsWithChildren} from "react";
import styles from './box.module.css'
import {classNames} from "../../utils";

export default function Box(props: PropsWithChildren) {
    return (
        <div className={classNames(styles.box, 'animation-slide-in', 'animation-sequential-delay')}>
            {props.children}
        </div>
    )
}