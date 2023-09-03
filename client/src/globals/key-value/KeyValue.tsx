import FaIcon from "../fa-icon/FaIcon"
import styles from "./key-value.module.css"

interface KeyValueProps {
    value: string;
    description?: string,
    icon: string
}

export default function KeyValue(props: KeyValueProps) {
    return (
        <div className={styles.keyValue}>
            <div className={styles.iconWrapper}>
                <FaIcon icon={props.icon}/>
            </div>
            <div className={styles.text}>
                <span className={styles.value}>{props.value}</span>
                {props.description ? <p>{props.description}</p> : null}
            </div>
        </div>
    )
}