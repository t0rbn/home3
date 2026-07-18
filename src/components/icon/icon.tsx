import styles from "./icon.module.css"
import {cns} from "@/utils/cns";

interface IconProps {
    icon: string,
    className?: string
    variant?: 'filled' | 'outlined'
}

export function Icon(props: IconProps) {
    return <span className={cns(styles.materialIcon,[styles.outlined, props.variant === 'outlined'], props.className)}>{props.icon}</span>
}