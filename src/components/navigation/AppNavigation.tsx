"use client";

import styles from "./AppNavigation.module.css"
import {usePathname, useRouter} from "next/navigation";
import {Button} from "@/components/buttons/Buttons";
import {ButtonGroup} from "@/components/buttons/ButtonGroup";


export function AppNavigation() {
    const pathName = usePathname();
    const router = useRouter()
    const isNestedRoute = pathName.split('/').length > 3

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

    return <nav className={styles.appNavigation}>
        <ButtonGroup fullWidth>
            {
                isNestedRoute
                    ? navButton('BACK', 'arrow_back')
                    : <>
                        {navButton('/scenes', 'home')}
                        {navButton('/tradfri', 'lightbulb_2')}
                    </>
            }
        </ButtonGroup>
    </nav>
}

