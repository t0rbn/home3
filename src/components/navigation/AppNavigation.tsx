"use client";

import styles from "./AppNavigation.module.css"
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";


export function AppNavigation() {
    const pathName = usePathname();
    const router = useRouter()

    const navButton = (href: string, icon: string) => {
        const active = pathName.startsWith(href);
        const handler = href === 'BACK' ? () => router.back() : () => router.push(href)

        return <Button
            variant={active ? 'active' : 'text'}
            className={styles.navButton}
            onClick={handler}
            icon={icon}
        />
    }

    function Buttons() {
        if (pathName.split('/').length > 3) {
            return navButton('BACK', 'arrow_back')
        }
        return <>
            {navButton('/scenes', 'home')}
            {navButton('/tradfri', 'lightbulb_2')}
            {navButton('/settings', 'settings')}
        </>
    }

    return <nav className={styles.appNavigation}>
        <Buttons/>
    </nav>
}

