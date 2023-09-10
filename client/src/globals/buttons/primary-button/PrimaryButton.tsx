import {PropsWithChildren} from "react";
import styles from './primary-button.module.css'
import {useNavigate} from "react-router-dom";
import {classNames} from "../../../utils";

export interface PrimaryButtonProps {
    onClick?: () => any;
    href?: string;
    style?: object;
    className?: string;
}

export default function PrimaryButton(props: PropsWithChildren<PrimaryButtonProps>) {
    const navigate = useNavigate()

    const handle = () => {
        if (props.href) {
            navigate(props.href)
            return
        }
        if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <button className={classNames(styles.button, props.className)} onClick={handle} style={props.style}>
            {props.children}
        </button>
    )
}
