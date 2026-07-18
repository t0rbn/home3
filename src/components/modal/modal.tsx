import {PropsWithChildren} from "react";
import styles from "./modal.module.css";
import Link from "next/link";
import {Icon} from "@/components/icon/icon";

interface ModalProps {
 closeHref?: string
}
export function Modal(props: PropsWithChildren<ModalProps>) {
    return <div className={styles.backdrop}>
        <main role="dialog" className={styles.modal}>
            <Link href={props.closeHref ?? '/'} className={styles.closeLink}>
                <Icon icon="close" />
            </Link>
            {props.children}
        </main>
    </div>
}