import styles from "./layout.module.css"
import globals from "../globals.module.css"

import {cns} from "@/utils/cns";
import {PropsWithChildren, ReactNode} from "react";

export const metadata = {
    title: 'home3'
}

export default function RootLayout(props: PropsWithChildren<{ device: ReactNode }>) {
    return <html lang="en" className={cns(styles.root, globals.root)}>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=block"
        />
        <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close,lightbulb_2,palette,power_settings_new,toggle_off,toggle_on&display=block"
        />
    </head>
    <body>
    {props.children}
    {props.device}
    </body>
    </html>
}
