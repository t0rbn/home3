"use client"

import {PropsWithChildren, useEffect, useState} from "react";
import styles from "./ListLayout.module.css"
import {cns} from "@/utils/cns";

export function ListLayout(props: PropsWithChildren<{largeGap?: boolean, animated?: boolean}>) {
    const [isInitialized, setIsInitialized] = useState(false);
    useEffect(() => {
        setIsInitialized(true);
    }, [])


    const classNames = [
        styles.listLayout,
        props.largeGap ? styles.large : undefined,
        props.animated ? styles.animated : undefined,
        isInitialized ? styles.initialized: undefined
    ]
    return <div key="foo" className={cns(...classNames)}>{props.children}</div>
}
