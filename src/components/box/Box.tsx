import {PropsWithChildren} from "react";
import {StyledContainer} from "@/components/containers/StyledContainer";
import styles from "./Box.module.scss"

export function Box(props: PropsWithChildren) {
    return <StyledContainer className={styles.box}>{props.children}</StyledContainer>
}