import styles from "./AppNavigation.module.css"
import {getGroups} from "@/actions/tradfri-actions";
import {Icon} from "@/components/icon/Icon";
import {NavLink} from "@/components/navigation/NavLink";
import {TradfriApiGroup} from "@/types/Tradfri";


export async function AppNavigation() {
    const groups = await getGroups();

    const groupNavItems = (group: TradfriApiGroup) => {
        const items: Array<{ name: string, comp: any }> = [
            ...(group.lights.map((light) => ({name: light.name, comp: <NavLink key={light.id} name={light.name} icon="lightbulb_2" href={`/tradfri/lights/${light.id}`}/>}))),
            ...(group.plugs.map((plug) => ({name: plug.name, comp: <NavLink key={plug.id} name={plug.name} icon="toggle_on" href={`/tradfri/plugs/${plug.id}`}/>})))
        ]
        return <>{items.sort((a, b) => a.name.localeCompare(b.name)).map(item => item.comp)}</>
    }

    return <nav className={styles.appNavigation}>

        <section>
            <h2>Home</h2>
            <NavLink name="Scenes" icon="home" href="/scenes"/>
        </section>

        <section>
            <h2>Devices</h2>
            {groups.map((group) => <div key={group.id} className={styles.deviceListSection}>
                <h3>{group.name}</h3>
                {groupNavItems(group)}
            </div>)}
        </section>

        <div className={styles.spacer}/>

        <section>
            <h2>Settings</h2>
            <NavLink name="Log" icon="sort" href="/settings/logs"/>
            <NavLink name="Restart" icon="refresh" href="/settings/restart"/>
        </section>

        <section className={styles.mobileCloseSection} tabIndex={0}>
            <label>
                <input type="checkbox" hidden id="mobile-nav"/>
                <Icon icon="menu" className={styles.menuIcon}/>
            </label>
        </section>

    </nav>
}

