import styles from "./layout.module.css"
import globals from "../globals.module.css"


import {cns} from "@/utils/cns";
import {AppNavigation} from "@/components/navigation/AppNavigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body>
    <div>
    <AppNavigation />
    <main>
        <div className={styles.content}>
            {children}
        </div>
    </main>
    </div>
    </body>
    </html>
}

export const dynamic = 'force-dynamic'
