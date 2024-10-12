import styles from "./ImageButton.module.scss"
import PrimaryButton from "../primary-button/PrimaryButton";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import Image from "next/image";

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
            // style={{backgroundImage: `url(${props.image})`}}
        >
            <GridContainer cols={1}>
                <div className={styles.imageContainer}>
                    <Image src={props.image} alt={props.label} fill  className={styles.image}/>
                </div>

                <div>{props.label}</div>
            </GridContainer>

        </PrimaryButton>
    )
}
