"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cns} from "@/utils/cns";
import styles from "@/components/navigation/AppNavigation.module.css";
import {Icon} from "@/components/icon/Icon";

export function NavLink(props: { name: string, icon: string, href: string }) {
    const pathName = usePathname();
    const active = pathName === props.href;
    const hideMobile = () => {
        const elem = document.querySelector('#mobile-nav') as HTMLInputElement | null;
        if (elem) {
            elem.checked = false
        }

    }

    return <Link onClick={hideMobile} href={props.href} className={cns(styles.navLink, active ? styles.navLinkActive : null)}>
        <Icon icon={props.icon} className={styles.icon}/>
        <span>{props.name}</span>
    </Link>
}