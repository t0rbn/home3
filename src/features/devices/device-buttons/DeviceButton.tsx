import {Icon} from "@/components/icon/Icon";
import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import styles from "./DeviceButton.module.scss";
import {cns} from "@/utils/cns";

interface ControlButtonProps {
    isOn: boolean
    onStatusColorHue?: string;
    onClick: () => void
    icon: string
    name: string

}

export function DeviceButton(props: ControlButtonProps) {
    return <PrimaryButton className={cns(styles.deviceButton, props.isOn ? styles.on : undefined)} onClick={props.onClick}>
        <Icon icon={props.icon} className={styles.icon}></Icon>
        <label>{props.name}</label>
    </PrimaryButton>
}