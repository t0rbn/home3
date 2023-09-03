import styles from './spinner.module.css'
import Box from "../box/Box";

export default function SpinnerBox() {
    return (
        <Box>
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
            </div>
        </Box>
    )
}