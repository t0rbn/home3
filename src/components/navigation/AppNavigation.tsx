import styles from "./AppNavigation.module.css"
import {getGroups} from "@/actions/tradfri-actions";
import {Icon} from "@/components/icon/Icon";
import globalStyles from "../../globals.module.css"
import {cns} from "@/utils/cns";
import {NavLink} from "@/components/navigation/NavLink";


export async function AppNavigation() {
    const groups = await getGroups();

    return <nav className={cns(globalStyles.surface, styles.appNavigation)}>
        <section>
            <h2>Home</h2>
            <NavLink name="Scenes" icon="home" href="/scenes"/>
        </section>

        <section>
            <h2>Devices</h2>
            {groups.map((group) => <div key={group.id} className={styles.deviceListSection}>
                <h3>{group.name}</h3>
                {group.lights.map(light => <NavLink key={light.id} name={light.name} icon="lightbulb" href={`/tradfri/lights/${light.id}`}/>)}
                {group.plugs.map(plug => <NavLink key={plug.id} name={plug.name} icon="power" href={`/tradfri/plugs/${plug.id}`}/>)}
            </div>)}
        </section>

        <div className={styles.spacer}/>

        <section>
            <h2>Settings</h2>
            <NavLink name="Log" icon="sort" href="/settings/logs"/>
            <NavLink name="Restart" icon="refresh" href="/settings/restart"/>
        </section>

        <section className={styles.mobileCloseSection}>
            <label>
                <input type="checkbox" hidden id="mobile-nav"/>
                <Icon icon="menu" className={styles.menuIcon}/>
            </label>
        </section>
    </nav>
}

