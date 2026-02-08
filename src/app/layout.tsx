import styles from "./layout.module.css"
import globals from "@/globals.module.css"
import animations from "@/animations.module.css"

import {cns} from "@/utils/cns";
import {AppNavigation} from "@/components/navigation/AppNavigation";

export const metadata = {
    title: 'home3'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root, animations.root)}>
    <body>
    <main>{children}</main>
    <AppNavigation/>
    </body>
    </html>
}

export const dynamic = 'force-dynamic'
