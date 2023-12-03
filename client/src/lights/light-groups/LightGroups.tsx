import {useLightGroupsContext} from "../LightGroupsContext";
import React, {CSSProperties, useEffect, useState} from "react";
import {ApiLightsGroup} from "../../../../shared/types/Light";
import SpinnerBox from "../../globals/spinner/SpinnerBox";
import styles from "./light-groups.module.css"
import MaterialIcon from "../../globals/material-icon/MaterialIcon";

export default function LightGroups() {
    const context = useLightGroupsContext();
    const [groups, setGroups] = useState<Array<ApiLightsGroup>>([]);

    function GroupItem(props: { startCol: number, width: number, startRow: number, height: number, name?: string, icon?: string }) {
        const gridPosStyles = {
            gridColumnStart: props.startCol,
            gridColumnEnd: props.startCol + props.width,
            gridRowStart: props.startRow,
            gridRowEnd: props.startRow + props.height
        } as CSSProperties

        const getIdForName = (name: string) => groups.find(g => g.name === name)?.id

        if (!props.name) {
            return <div className={styles.roomPlaceholder} style={gridPosStyles}></div>
        }
        return <a className={styles.roomButton} style={gridPosStyles} href={'/lights/groups/' + getIdForName(props.name)}>
            <MaterialIcon icon={props.icon || ''} className={styles.icon} />
            {props.name}
        </a>
    }

    useEffect(() => {
        setGroups(context.lightGroups)
    }, [context.lightGroups]);

    if (!groups?.length) {
        return <SpinnerBox/>
    }

    return (
        <div className={styles.floorPlan}>
            <GroupItem width={1} height={2} startRow={1} startCol={1} name="Bedroom" icon="bed"/>
            <GroupItem width={4} height={3} startRow={1} startCol={2} name="Living Room" icon="scene"/>
            <GroupItem width={1} height={2} startRow={3} startCol={1} name="Bathroom" icon="wc"/>

            <GroupItem width={1} height={1} startRow={5} startCol={1}/>
            <GroupItem width={1} height={2} startRow={4} startCol={2}/>
            <GroupItem width={1} height={2} startRow={4} startCol={3} name="Kitchen" icon="skillet"/>
        </div>
    )
}