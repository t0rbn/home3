import styles from "./loading.module.css"
import {Icon} from "@/components/icon/icon";

export default async function LoadingPage() {
    return <div className={styles.loadingLayout}>
        <Icon icon="progress_activity" className={styles.icon}/>
    </div>
}