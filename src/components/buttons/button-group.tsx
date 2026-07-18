import {PropsWithChildren} from "react";
import styles from "./buttons.module.css"
import {Grid, List} from "@/components/layout/layouts";
import {cns} from "@/utils/cns";

interface ButtonGroupProps {
    label?: string,
    connected?: boolean,

}
export function ButtonGroup(props: PropsWithChildren<ButtonGroupProps>) {


    function Wrapper() {
        if (props.connected) {
            return <div className={styles.buttonGroupConnected}>{props.children}</div>
        }
        return <Grid>{props.children}</Grid>
    }

    return <List>
        {props.label && <label>{props.label}</label>}
        <Wrapper />
    </List>
}