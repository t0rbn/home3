import styles from './image-button.module.css'
import PrimaryButton from "../primary-button/PrimaryButton";

interface ImageButtonProps {
    onClick?: () => any;
    href?: string;
    label: string;
    image: string;
}

export default function ImageButton(props: ImageButtonProps) {
    const path = 'url(' + props.image + ')'
    const bgStyle = {backgroundImage: 'linear-gradient(to right, var(--color-imagebutton-bg), transparent), ' + path}

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
