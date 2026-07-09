"use server";

import styles from "./AppNavigation.module.css"
import {getGroups} from "@/app/tradfri/TradfriService";
import {NavButton, NavButtonProps} from "@/components/navigation/NavButton";
import {TradfriDevice} from "@/types/Tradfri";
import {ListLayout} from "@/components/layout/ListLayout/ListLayout";
import Link from "next/link";
import {Icon} from "@/components/icon/Icon";


export async function AppNavigation() {
    const groups = await getGroups();

    const deviceToNavButton = (device: TradfriDevice): NavButtonProps => {
        const typeIconMap: Record<TradfriDevice['type'], string> = {
            'light': 'lightbulb_2',
            'plug': 'outlet'
        }

        return {
            name: device.name,
            icon: typeIconMap[device.type],
            href: `/tradfri/${device.id}`,
        }
    }

    const navItems: Array<{ heading: string, links: Array<NavButtonProps> }> = [
        {
            heading: 'Home',
            links: [
                {icon: 'grid_view', name: 'Scenes', href: '/scenes'}
            ]
        },
        ...groups.map((g) => ({heading: g.name, links: g.devices.map(d => deviceToNavButton(d))}))
    ]

    return <nav className={styles.appNavigation}>
        <ListLayout largeGap>
            {navItems.map((section) => <ListLayout key={section.heading}>
                <strong>{section.heading}</strong>
                <div>{section.links.map((l) => <NavButton key={l.href} {...l} />)}</div>
            </ListLayout>)}
        </ListLayout>
    </nav>
}

export async function AppNavigationSideBar() {
    return <div className={styles.sidebar}>
        <div className={styles.desktop}>
            <AppNavigation />
        </div>
        <div className={styles.mobile}>
            <Link href="/menu" className={styles.link}><Icon icon="menu" className={styles.icon}/></Link>
        </div>

    </div>
}

