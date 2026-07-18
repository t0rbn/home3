import {CSSProperties, PropsWithChildren} from "react";
import styles from "./layouts.module.css"
import {cns} from "@/utils/cns";

type LayoutProps = PropsWithChildren<{
    className?: string,
    style?: CSSProperties
}>


function Layout(props: LayoutProps & { layoutClass: string }) {
    return <div className={cns(props.layoutClass, props.className)} style={props.style}>
        {props.children}
    </div>
}

export function Grid(props: LayoutProps) {
    return <Layout layoutClass={styles.grid} {...props}>
        {props.children}
    </Layout>
}

interface ListProps {
    bigSpace?: boolean
}
export function List(props: LayoutProps & ListProps) {
    return <Layout layoutClass={cns(styles.list, [styles.bigSpace, !!props.bigSpace])} {...props}>
        {props.children}
    </Layout>
}
