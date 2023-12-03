import MaterialIcon from "../material-icon/MaterialIcon"
import styles from "./key-value.module.css"
import Box from "../box/Box";

interface KeyValueProps {
    value: string;
    description?: string,
    icon: string
}

export default function KeyValue(props: KeyValueProps) {
    return (
        <Box>
            <div className={styles.keyValue}>
                <div className={styles.iconWrapper}>
                    <MaterialIcon icon={props.icon} className={styles.icon}/>
                </div>
                <div className={styles.text}>
                    <span className={styles.value}>{props.value}</span>
                    {props.description ? <p>{props.description}</p> : null}
                </div>
            </div>
        </Box>

    )
}