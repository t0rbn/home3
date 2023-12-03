import styles from "./material-icon.module.css"
import {classNames} from "../../utils";

interface MaterialIconProps {
    icon: string,
    className?: string,
}

export default function MaterialIcon(props: MaterialIconProps) {
    return <span className={classNames(styles.materialIcon, props.className)}>{props.icon}</span>
}