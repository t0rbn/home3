import React, {PropsWithChildren} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./link.module.css";

interface LinkProps {
    href: string,
}

export default function Link(props: PropsWithChildren<LinkProps>) {
    const navigate = useNavigate();
    return <a onClick={() => navigate(props.href)} className={styles.link}>{props.children}</a>
}