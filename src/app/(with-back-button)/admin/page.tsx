"use client";

import {GridContainer} from "@/components/containers/grid/GridContainer";
import {restartApp} from "@/actions/restart-action";
import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";

export default function AdminPage() {
    const restartServer = async () => {
        restartApp().then(() => {})
        await new Promise(resolve => setTimeout(resolve, 1000));
        location.reload()
    }
    return <GridContainer cols={4} colsMedium={2}>
        <PrimaryButton onClick={restartServer}>restart server</PrimaryButton>
        <PrimaryButton onClick={window.location.reload}>reload client</PrimaryButton>
    </GridContainer>
}