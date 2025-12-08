import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {AppNavigation} from "@/components/navigation/AppNavigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    // const groups = await getGroups();
    // const colors = groups.flatMap(g => g.lights).filter(l => l.brightness > 0).map(l => sanitizeColor(l.color))


    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body
        // style={{'--accent-background': getAverageHexColor(colors)}}
    >
    <main>{children}</main>
    <AppNavigation/>
    </body>
    </html>
}

export const dynamic = 'force-dynamic'
