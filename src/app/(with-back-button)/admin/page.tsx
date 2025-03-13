"use client";

import {GridContainer} from "@/components/containers/grid/GridContainer";
import {restartApp} from "@/actions/restart-action";
import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";

export default function AdminPage() {
    const restartServer = async () => {
        restartApp().then(() => {})
    }
    return <GridContainer cols={4} colsMedium={2}>
        <PrimaryButton onClick={restartServer}>restart server</PrimaryButton>
    </GridContainer>
}