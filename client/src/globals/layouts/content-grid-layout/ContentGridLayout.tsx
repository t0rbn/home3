import {PropsWithChildren} from "react";
import styles from './content-grid-layout.module.css'
import {classNames, conditionalClassName} from "../../../utils";

interface ContentGridLayoutProps {
    variant?: 'default' | 'small-items'

}

export default function ContentGridLayout(props: PropsWithChildren<ContentGridLayoutProps>) {
    const classes = [
        styles.layout,
        conditionalClassName(props.variant === 'small-items', styles.many)
    ]
    return <div className={classNames(...classes)}>{props.children}</div>
}