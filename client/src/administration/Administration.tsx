import Box from "../globals/box/Box";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";
import React from "react";
import PrimaryButton from "../globals/buttons/primary-button/PrimaryButton";
import config from "../shared/config.json"
import {resolveApi} from "../utils";
import {ApiAdministrationAction} from "../../../shared/types/Administration";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import Section from "../globals/section/Section";

export default function Administration() {

    const refresh = () => {
        window.location.reload();
    }

    const performaction = async (action: ApiAdministrationAction) => {
        await fetch(resolveApi(config.api.administration, 'action'), {
            method: 'post',
            headers: {'Content-Type': 'text/plain;charset=UTF-8'},
            body: JSON.stringify(action)
        })
    }
    const restartServer = async () => {
        if (!window.confirm("Restart Server?")) {
            return;
        }
        await performaction({type: 'restart-application'})
        refresh();
    }

    return (
        <AppLayout backButton>
            <Section name="Restart">
                    <ContentGridLayout cols={2} colsSmall={2}>
                        <PrimaryButton onClick={restartServer}>Server</PrimaryButton>
                        <PrimaryButton onClick={refresh}>Client</PrimaryButton>
                    </ContentGridLayout>
            </Section>
            <Section name="Config">
                <Box>
                     <pre>
                    {JSON.stringify(config, null, 4)}
                    </pre>
                </Box>
            </Section>
        </AppLayout>
    )
}