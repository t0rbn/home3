import styles from "./AppNavigation.module.css"
import {BackLink, NavLink} from "@/components/navigation/NavLink";


export function AppNavigation() {
    return <nav className={styles.appNavigation}>

        <BackLink />

        <div className={styles.container}>
            <NavLink icon="home" href="/scenes"/>
            <NavLink icon="lightbulb" href="/tradfri"/>
            <NavLink icon="settings" href="/settings"/>
        </div>

    </nav>
}

