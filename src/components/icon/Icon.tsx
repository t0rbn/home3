import styles from "./Icon.module.css"
import {cns} from "@/utils/cns";

interface IconProps {
    icon: string,
    className?: string
}

export function Icon(props: IconProps) {
    return <span className={cns(styles.materialIcon, props.className)}>{props.icon}</span>
}