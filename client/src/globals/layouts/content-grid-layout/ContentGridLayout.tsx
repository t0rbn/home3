import {PropsWithChildren} from "react";
import styles from './content-grid-layout.module.css'

interface ContentGridLayoutProps {
    variant?: 'small'
}

export default function ContentGridLayout(props: PropsWithChildren<ContentGridLayoutProps>) {
    return (
        <div className={`${props.variant === 'small' ? styles.small : ''} ${styles.layout}`}>
            {props.children}
        </div>
    )
}