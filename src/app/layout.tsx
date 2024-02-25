import styles from "./page.module.scss"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={styles.root}>
      <body>{children}</body>
    </html>
  );
}
