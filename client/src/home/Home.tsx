import Scenes from "../scenes/Scenes";
import React from "react";
import Climate from "../climate/Climate";
import LightsHomeHero from "../lights/lights-home-hero/LightsHomeHero";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import ListLayout from "../globals/layouts/list-layout/ListLayout";

export default function Home() {
    return (
        <AppLayout name="Home" header={false}>
            <ListLayout space="big">
                <Scenes/>
                <LightsHomeHero/>
                <Climate></Climate>
            </ListLayout>
        </AppLayout>
    )
}