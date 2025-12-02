import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {AppNavigation} from "@/components/navigation/AppNavigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    // const groups = await getGroups();
    // const colors = [...new Set(groups.flatMap(g => g.lights).filter(l => l.brightness > 0).map(l => sanitizeColor(l.color)))]
    //
    // const acc = { r: 0, g: 0, b: 0}
    // colors.forEach(c => {
    //     acc.r += Number.parseInt('0x' + c.slice(1,3))
    //     acc.g += Number.parseInt('0x' + c.slice(3,5))
    //     acc.b += Number.parseInt('0x' + c.slice(5,7))
    // })
    //
    // acc.r = Math.floor(acc.r / colors.length)
    // acc.g = Math.floor(acc.g / colors.length)
    // acc.b = Math.floor(acc.b / colors.length)
    //
    // const avgColor = `#`
    //     + acc.r.toString(16).padStart(2, '0')
    //     + acc.g.toString(16) .padStart(2, '0')
    //     + acc.b.toString(16).padStart(2, '0')

    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body>
    <main>{children}</main>
    <AppNavigation/>
    </body>
    </html>
}

export const dynamic = 'force-dynamic'
