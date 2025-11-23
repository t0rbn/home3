"use client";

import styles from "./AppNavigation.module.css"
import {BackLink, NavLink} from "@/components/navigation/NavLink";
import {usePathname} from "next/navigation";


export function AppNavigation() {
    const pathName = usePathname();

    function Buttons() {
        if (pathName.split('/').length > 3) {
            return <BackLink/>;
        }
        return <>
            <NavLink icon="home" href="/scenes"/>
            <NavLink icon="lightbulb" href="/tradfri"/>
        </>
    }

    return <nav className={styles.appNavigation}>
        <Buttons/>
    </nav>
}

