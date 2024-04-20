import styles from "./page.module.scss"
import {NavButton} from "@/components/nav-button/NavButton";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<html lang="en" className={styles.root}>
    <body>
    <main>
        <div>{children}</div>
    </main>
    <nav>
        <NavButton name="Scenes" path="/scenes"/>
        <NavButton name="Lights" path="/lights"/>
        <NavButton name="Settings" path="/settings"/>
    </nav>
    </body>
    </html>);
}
