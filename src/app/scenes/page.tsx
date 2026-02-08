import {getScenes} from "@/actions/tradfri-actions";
import styles from "./page.module.css"
import {SceneButton} from "@/app/scenes/SceneButton";

export default async function ScenesPage() {
    const scenes = await getScenes()

    return <div className={styles.scenesLayout}>
        {scenes?.map((s) => <SceneButton scene={s} key={s.id}/>)}
    </div>
}