import styles from "./ImageButton.module.scss"
import PrimaryButton from "../primary-button/PrimaryButton";

interface ImageButtonProps {
    onClick?: () => any;
    href?: string;
    label: string;
    image: string;
}

export default function ImageButton(props: ImageButtonProps) {
    return (
        <PrimaryButton
            onClick={props.onClick}
            className={styles.imageButton}
            style={{backgroundImage: `url(${props.image})`}}
        >
            <label>{props.label}</label>
        </PrimaryButton>
    )
}
