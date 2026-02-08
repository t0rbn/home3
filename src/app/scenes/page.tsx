import {getScenes} from "@/actions/tradfri-actions";
import styles from "./page.module.css"
import animations from "@/animations.module.css";
import {cns} from "@/utils/cns";
import {SceneButton} from "@/app/scenes/SceneButton";

export default async function ScenesPage() {
    const scenes = await getScenes()

    return <div className={cns(styles.scenesLayout, animations.animationPopFade, animations.animationStaggered)}>
        {scenes?.map((s) => <SceneButton scene={s} key={s.id}/>)}
    </div>
}