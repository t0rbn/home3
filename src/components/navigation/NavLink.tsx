"use client";

import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";
import {cns} from "@/utils/cns";
import styles from "@/components/navigation/AppNavigation.module.css";
import {Icon} from "@/components/icon/Icon";

export function NavLink(props: { icon: string, href: string }) {
    const pathName = usePathname();
    const active = pathName.startsWith(props.href);

    return <Link href={props.href} className={cns(styles.navLink, active ? styles.navLinkActive : null)}>
        <Icon icon={props.icon} className={styles.icon}/>
    </Link>
}

export function BackLink() {
    const pathName = usePathname();
    const router = useRouter()

    if (pathName.split('/').length <= 2) {
        return null
    }

    return <div className={styles.container}>
        <div className={cns(styles.navLink, styles.backLink)} onClick={() => router.back()}>
            <Icon icon="arrow_back" className={styles.icon}/>
        </div>
    </div>
}