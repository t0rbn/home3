import styles from "./ImageButton.module.scss"

interface ImageButtonProps {
    onClick: () => void;
    label: string;
    image: string;
}

export default function ImageButton(props: ImageButtonProps) {
    return (
        <button
            onClick={props.onClick}
            className={styles.imageButton}
        >
            <div className={styles.hoverContainer} style={{backgroundImage: `url(${props.image})`}}/>
            <div className={styles.imageContainer} data-background-image={props.image} style={{backgroundImage: `url(${props.image})`}}/>
            <label>{props.label}</label>
        </button>
    )
}
