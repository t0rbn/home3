import React, {PropsWithChildren} from "react";
import styles from './app-layout.module.css'
import PrimaryButton from "../../buttons/primary-button/PrimaryButton";
import FaIcon from "../../fa-icon/FaIcon";
import ListLayout from "../list-layout/ListLayout";
import {classNames} from "../../../utils";

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
                    <div className={classNames(styles.linkContainer, styles.linkContainerHidden)}>
                        <PrimaryButton><FaIcon icon="chevron-left"/> back</PrimaryButton>
                    </div>
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