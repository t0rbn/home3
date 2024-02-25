"use client";

import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import {restartApp} from "@/actions/restart-action";

export function RestartAppButton() {
    return <PrimaryButton onClick={() => restartApp()}>restart server</PrimaryButton>
}