import React, {PropsWithChildren} from "react";
import styles from './app-layout.module.css'
import PrimaryButton from "../../primary-button/PrimaryButton";
import FaIcon from "../../fa-icon/FaIcon";
import ListLayout from "../list-layout/ListLayout";

interface AppLayoutProps {
    name: string;
    header?: boolean;
}

export default function AppLayout(props: PropsWithChildren<AppLayoutProps>) {
    return (
        <div className={styles.layout}>
            {props.header !== false ? (
                <header className="animation-slide-down">
                    <div className={styles.linkContainer}>
                        <PrimaryButton href="/"><FaIcon icon="chevron-left"/> back</PrimaryButton>
                    </div>
                    <h2>{props.name}</h2>
                </header>
            ) : null}

            <div className={styles.contentWrapper}>
                <main className={styles.content}>
                    <ListLayout space="big">
                        {props.children}
                    </ListLayout>
                </main>
            </div>
        </div>
    )
}