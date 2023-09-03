import styles from './spinner.module.css'

export default function Spinner() {
    return (
        <div className={styles.spinner}>
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinnerContent}></div>
            </div>
            <p>loading...</p>
        </div>
    )
}