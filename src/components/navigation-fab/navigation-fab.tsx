"use client"

import {usePathname} from "next/navigation";
import {ButtonGroup} from "@/components/buttons/button-group";
import {Button} from "@/components/buttons/buttons";
import styles from "./navitaion-fab.module.css"

interface RouteItem {
    icon: string,
    href: string,
}

export function NavigationFab() {
    const pathName = usePathname()

    const routes: Array<RouteItem> = [
        {icon: 'home', href: '/scenes'},
        {icon: 'lightbulb_2', href: '/devices'},
    ]

    const displayedRoutes = routes.filter((route: RouteItem) => route.href !== pathName)

    return <nav className={styles.navigationFab}>
        <ButtonGroup connected>
            {displayedRoutes.map((route: RouteItem) => <Button
                icon={route.icon}
                href={route.href}
                className={styles.fabButton} key={route.href}
            />)}
        </ButtonGroup>
    </nav>
}