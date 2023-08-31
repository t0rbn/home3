import React, {PropsWithChildren} from "react";
import {Link} from "react-router-dom";
import styles from './app-layout.module.css'

interface AppLayoutProps {
    name: string;
    header?: boolean;
}

export default function AppLayout(props: PropsWithChildren<AppLayoutProps>) {
    return (
        <div className={styles.layout}>
            {props.header !== false ? (
                <header>
                    <div className={styles.linkContainer}>
                        <Link to="/">back</Link>
                    </div>
                    <h2>{props.name}</h2>
                </header>
            ) : null}

            <div className={styles.contentWrapper}>
                <main className={styles.content}>
                    {props.children}
                </main>
            </div>
        </div>
    )
}