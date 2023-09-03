import PrimaryButton from "../primary-button/PrimaryButton";
import styles from './image-button.module.css'

interface ImageButtonProps {
    onClick?: () => any;
    href?: string;
    label: string;
    image: string;
}

export default function ImageButton(props: ImageButtonProps) {
    const path = 'url(' + props.image + ')'
    const bgStyle = {backgroundImage: 'linear-gradient(to right, var(--color-elevation-interactive), transparent), ' + path}

    return (
        <PrimaryButton
            onClick={props.onClick}
            href={props.href}
            style={bgStyle}
            className={styles.imageButton}
        >
            {props.label}
        </PrimaryButton>
    )
}
