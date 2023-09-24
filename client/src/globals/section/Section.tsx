import {PropsWithChildren} from "react";
import styles from './section.module.css';
import {classNames} from "../../utils";

interface SectionProps {
    name: string
}

export default function Section(props: PropsWithChildren<SectionProps>) {
    return (
        <section className={classNames(styles.section, 'animation-slide-up', 'animation-sequential-delay')}>
            <h1>{props.name}</h1>
            {props.children}
        </section>
    )
}

