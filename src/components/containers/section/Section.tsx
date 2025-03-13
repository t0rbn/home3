import {PropsWithChildren} from "react";
import styles from "./Section.module.scss";

interface SectionProps {
    level: 'primary' | 'secondary'
    title?: string
}

export function Section(props: PropsWithChildren<SectionProps>) {
    const headline = props.title ? (props.level === 'primary' ? <h1 className={styles.title}>{props.title}</h1> : <h2 className={styles.title}>{props.title}</h2>) : null;

    return <section className={styles.section}>
        {headline}
        <div>{props.children}</div>
    </section>
}