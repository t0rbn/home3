import {Grid, List} from "@/components/layout/layouts";
import styles from "./loading.module.css"

export default async function LoadingPage() {
    const SCENES_COUNT = 9;
    const DEVICES_COUNT = 9;

    return <List bigSpace>
        <List>
            <h1>Scenes</h1>
            <Grid>{[...Array(SCENES_COUNT)].map((e, i) => <div className={styles.sceneSkeleton} key={i}/>)}</Grid>
        </List>

        <List>
            <h1>Devices</h1>
            <Grid>{[...Array(DEVICES_COUNT)].map((e, i) => <div className={styles.buttonSkeleton} key={i}>&nbsp;</div>)}</Grid>
        </List>
    </List>
}