"use client"

import Link from "next/link";
import {cns} from "@/utils/cns";
import styles from "./AppNavigation.module.css";
import {Icon} from "@/components/icon/Icon";
import {usePathname, useRouter} from "next/navigation";

export interface NavButtonProps {
    name: string,
    href: string,
    icon: string,
}

export function NavButton(props: NavButtonProps) {
    const pathName = usePathname();
    const active = pathName.startsWith(props.href);

    return <Link
        href={props.href}
        className={cns(styles.navButton, active ? styles.active : null)}>
        <Icon className={styles.icon} icon={props.icon} />
        {props.name}
    </Link>
}