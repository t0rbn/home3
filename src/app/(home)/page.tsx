import {Grid, List} from "@/components/layout/layouts";
import {connection} from "next/server";
import {getGroups, getScenes} from "@/app/TradfriService";
import {SceneButton} from "@/app/(home)/SceneButton";
import {DeviceButton} from "@/app/(home)/DeviceButton";

export default async function MainPage() {
    await connection()
    const scenes = await getScenes();
    const groups = await getGroups();


    return <List bigSpace>
        <List>
            <h1>Scenes</h1>
            <Grid>{scenes.map(s => <SceneButton scene={s} key={s.id}/>)}</Grid>
        </List>

        <List>
            <h1>Devices</h1>
            <Grid>
                {
                    groups
                        .flatMap(g => g.devices)
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(d => <DeviceButton device={d} key={d.id}/>)
                }

            </Grid>
        </List>
    </List>
}
