"use client"

import Link from "next/link";
import {cns} from "@/utils/cns";
import styles from "./AppNavigation.module.css";
import {Icon} from "@/components/icon/Icon";
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";

export interface NavButtonProps {
    name: string,
    href: string,
    icon: string,
}

export function NavButton(props: NavButtonProps) {
    const pathName = usePathname();
    const active = pathName.startsWith(props.href);

    return <Button
        variant={active ? 'active' : 'text'}
        href={props.href}
        className={styles.navButton}
        icon={props.icon}
        label={props.name}
    />
}