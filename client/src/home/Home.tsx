import Scenes from "../scenes/Scenes";
import React from "react";
import Climate from "../climate/Climate";
import LightGroups from "../lights/light-groups/LightGroups";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import ListLayout from "../globals/layouts/list-layout/ListLayout";
import Link from "../globals/link/Link";

export default function Home() {
    return (
        <AppLayout name="Home" header={false}>
                <Scenes/>
                <LightGroups/>
                <Climate/>
                <Link href="/administration">Settings</Link>
        </AppLayout>
    )
}