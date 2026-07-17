import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {NavigationFab} from "@/components/navigation-fab/navigation-fab";
import {Suspense} from "react";

export const metadata = {
    title: 'home3'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body>
    <main>{children}</main>
    <Suspense><NavigationFab /></Suspense>
    </body>
    </html>
}
