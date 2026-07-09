import styles from "./page.module.css"
import {SceneButton} from "@/app/scenes/SceneButton";
import {NextRequest} from "next/server";
import {TradfriScene} from "@/types/Tradfri";
import {getScenes} from "@/app/tradfri/TradfriService";

export default async function ScenesPage(req: NextRequest) {
    const scenes = await getScenes()

    return <div className={styles.scenesLayout}>
        {scenes?.map((s) => <SceneButton scene={s} key={s.id}/>)}
    </div>
}