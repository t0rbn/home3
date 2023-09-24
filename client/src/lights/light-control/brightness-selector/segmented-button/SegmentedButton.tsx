import PrimaryButton, {PrimaryButtonProps} from "../../../../globals/buttons/primary-button/PrimaryButton";
import styles from "./segmented-button.module.css"
import {classNames, conditionalClassName} from "../../../../utils";

interface SegmentedButtonProps {
    buttons: Array<PrimaryButtonProps & {label: string, isActive?: boolean}>
}

export default function SegmentedButton(props: SegmentedButtonProps) {
    return (
        <div className={styles.buttonGroup}>
            {props.buttons.map(b => <PrimaryButton className={classNames(styles.button, conditionalClassName(!!b.isActive, styles.active))} key={b.label} onClick={b.onClick} href={b.href}>{b.label}</PrimaryButton>)}
        </div>
    )
}