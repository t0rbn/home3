import {PropsWithChildren} from "react";
import styles from './list-layout.module.css'
import {classNames, conditionalClassName} from "../../../utils";

interface ListLayoutProps {
    space?: 'default' | 'big'
}

export default function ListLayout(props: PropsWithChildren<ListLayoutProps>) {
    const classes = [
        styles.layout,
        conditionalClassName(props.space === 'big', styles.big),
    ]
    return <div className={classNames(...classes)}>{props.children}</div>
}