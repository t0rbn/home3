import styles from "./page.module.css"
import {SceneButton} from "@/app/scenes/SceneButton";
import {TradfriApiScene} from "@/types/Tradfri";
import {NextRequest} from "next/server";
import {apiUrl} from "@/utils/apiUrl";

export default async function ScenesPage(req: NextRequest) {
    const scenes: Array<TradfriApiScene> = await fetch(apiUrl('/tradfri/api/scenes')).then(res => res.json())

    return <div className={styles.scenesLayout}>
        {scenes?.map((s) => <SceneButton scene={s} key={s.id}/>)}
    </div>
}

export const dynamic = 'force-dynamic'
