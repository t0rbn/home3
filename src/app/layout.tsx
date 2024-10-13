import styles from "./page.module.scss"
import {NavButton} from "@/components/nav-button/NavButton";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (<html lang="en" className={styles.root}>
    <body>
    <main>
        <div>{children}</div>
    </main>
    <nav>
        <NavButton icon="home" path="/scenes"/>
        <NavButton icon="lightbulb" path="/lights"/>
    </nav>
    </body>
    </html>);
}
