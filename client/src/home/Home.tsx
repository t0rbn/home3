import Scenes from "../scenes/Scenes";
import React from "react";
import Climate from "../climate/Climate";
import LightGroups from "../lights/light-groups/LightGroups";
import AppLayout from "../globals/layouts/app-layout/AppLayout";
import PrimaryButton from "../globals/buttons/primary-button/PrimaryButton";
import Section from "../globals/section/Section";


export default function Home() {
    return (
        <AppLayout>
            <Section name="Scenes"><Scenes/></Section>
            <Section name="Lights"><LightGroups/></Section>
            <Section name="Climate"><Climate/></Section>

            <div><PrimaryButton href="/administration">Settings</PrimaryButton></div>
        </AppLayout>
    )
}