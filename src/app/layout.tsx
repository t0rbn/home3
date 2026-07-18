import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {PropsWithChildren, ReactNode} from "react";

export const metadata = {
    title: 'home3'
}

export default function RootLayout(props: PropsWithChildren<{ device: ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root)}>
    <body>
    {props.children}
    {props.device}
    </body>
    </html>
}
