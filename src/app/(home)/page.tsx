import {Grid, List} from "@/components/layout/layouts";
import {connection} from "next/server";
import {getGroups, getScenes} from "@/app/tradfri-service";
import {SceneButton} from "@/app/(home)/scene-button";
import {Devices} from "@/app/(home)/devices";
import styles from "./page.module.css"

export default async function MainPage() {
    await connection()
    const scenes = await getScenes();
    const groups = await getGroups();

    return <div className={styles.layout}>
        <List>
            <h1>Scenes</h1>
            <Grid className={styles.scenesGrid}>{scenes.map(s => <SceneButton scene={s} key={s.id}/>)}</Grid>
        </List>

       <Devices groups={groups} />
    </div>
}

export const instant = false