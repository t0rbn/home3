import styles from "./page.module.scss"
import {NavButton} from "@/components/nav-button/NavButton";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<html lang="en" className={styles.root}>
    <body>
    <nav>
        <NavButton name="Scenes" path="/scenes" />
        <NavButton name="Lights" path="/lights" />
    </nav>
    <main>
        <div>{children}</div>
    </main>
    </body>
    </html>);
}
