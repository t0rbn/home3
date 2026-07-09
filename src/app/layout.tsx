import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {AppNavigation, AppNavigationSideBar} from "@/components/navigation/AppNavigation";
import Link from "next/link";
import {Icon} from "@/components/icon/Icon";

export const metadata = {
    title: 'home3'
}

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body>
    <AppNavigationSideBar/>
    <main>{children}</main>
    </body>
    </html>
}
