import {PropsWithChildren} from "react";
import styles from './list-layout.module.css'
import {classNames, conditionalClassName} from "../../../utils";

export default function ListLayout(props: PropsWithChildren) {
    return <div className={classNames(styles.layout)}>{props.children}</div>
}