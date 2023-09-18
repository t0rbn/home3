import styles from './image-button.module.css'
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
            href={props.href}
            className={styles.imageButton}
        >
            <img src={props.image} alt={props.label}/>
            <label>{props.label}</label>
        </PrimaryButton>
    )
}
