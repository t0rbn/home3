import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import styles from "./MultiButtonGroup.module.scss"

interface MultiButtonGroupProps {
    buttons: Array<{label: string, onClick: () => void}>
}

export function MultiButtonGroup(props: MultiButtonGroupProps) {
    return <div className={styles.multiButtonGroup}>
        {props.buttons.map((b) => <PrimaryButton key={b.label} onClick={b.onClick} className={styles.button}>{b.label}</PrimaryButton>)}
    </div>
}