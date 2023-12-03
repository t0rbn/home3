import React, {PropsWithChildren} from "react";
import styles from './app-layout.module.css'
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import MaterialIcon from "../../material-icon/MaterialIcon";

interface AppLayoutProps {
    backButton?: boolean;
}

export default function AppLayout(props: PropsWithChildren<AppLayoutProps>) {
    return (
        <main className={styles.layout}>
            <div className={styles.content}>
                {props.backButton ? (
                    <div className={styles.linkContainer}>
                        <PrimaryButton href="/"><MaterialIcon icon="arrow_back"/> back</PrimaryButton>
                    </div>
                ) : null}
                {props.children}
            </div>
        </main>
    )
}