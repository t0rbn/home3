import Box from "../globals/box/Box";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";
import React from "react";
import ListLayout from "../globals/layouts/list-layout/ListLayout";
import PrimaryButton from "../globals/buttons/primary-button/PrimaryButton";
import config from "../shared/config.json"
import {resolveApi} from "../utils";
import {ApiAdministrationAction} from "../../../shared/types/Administration";
import AppLayout from "../globals/layouts/app-layout/AppLayout";

export default function Administration() {

    const refresh = () => {
        window.location.reload();
    }

    const restartServer = async () => {
        if (!window.confirm("Restart Server?")){
            return;
        }
        await fetch(resolveApi(config.api.administration, 'action'), {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify({type: 'restart-application',} as ApiAdministrationAction)
        })
        refresh();
    }

    return (
        <AppLayout name="Administration">
            <Box>
                <ListLayout space="big">
                    <h1>Restart</h1>
                    <ContentGridLayout>
                        <PrimaryButton onClick={restartServer}>Server</PrimaryButton>
                        <PrimaryButton onClick={refresh}>Client</PrimaryButton>
                    </ContentGridLayout>
                </ListLayout>
            </Box>
            <Box>
                <ListLayout space="big">
                    <h1>Config</h1>
                    <pre>
                    {JSON.stringify(config, null, 4)}
                    </pre>
                </ListLayout>
            </Box>
        </AppLayout>
    )
}