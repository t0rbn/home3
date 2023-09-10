import PrimaryButton from "../../../globals/buttons/primary-button/PrimaryButton";
import styles from "./color-button.module.css"

interface ColorButtonProps {
    color: string;
    onClick: () => any;
}

export default function ColorButton(props: ColorButtonProps) {
    return (
            <PrimaryButton onClick={props.onClick} style={{backgroundColor: props.color}} className={styles.button}>&nbsp;</PrimaryButton>
    )
}