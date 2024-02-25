"use client";

import Link from "next/link";
import {cns} from "@/utils/cns";
import {usePathname} from "next/navigation";
import styles from "./NavButton.module.scss"

interface NavButtonProps {
    name: string,
    path: string,
}

export function NavButton(props: NavButtonProps) {
    const pathName = usePathname()?.replace('/$', '');
    const isActive = pathName?.startsWith(props.path);

    return <Link href={props.path} className={cns(styles.navButton, isActive ? styles.active : undefined)}>{props.name}</Link>
}