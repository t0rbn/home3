import Scenes from "../scenes/Scenes";
import React from "react";
import Climate from "../climate/Climate";
import LightGroups from "../lights/light-groups/LightGroups";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import ListLayout from "../globals/layouts/list-layout/ListLayout";
import SpinnerBox from "../globals/spinner/SpinnerBox";
import Box from "../globals/box/Box";

export default function Home() {
    return (
        <AppLayout name="Home" header={false}>
            <ListLayout space="big">
                <Scenes/>
                <LightGroups/>
                <Climate />
            </ListLayout>
        </AppLayout>
    )
}