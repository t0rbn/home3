import {useLightGroupsContext} from "../LightGroupsContext";
import {useEffect, useState} from "react";
import PrimaryButton from "../../globals/primary-button/PrimaryButton";
import Box from "../../globals/box/Box";

export default function LightsHomeHero() {
    const lightsContext = useLightGroupsContext();
    const [activeLightsCount, setActiveLightsCount] = useState(0);

    useEffect(() => {
        if (lightsContext.lightGroups.length === 0) {
            setActiveLightsCount(0)
            return
        }
        setActiveLightsCount(lightsContext.lightGroups.map(g => g.lights.filter(l => l.brightness > 0).length).reduce((a, b) => a + b))
    }, [lightsContext.lightGroups]);

    return (
        <Box>
            <h1>Lights</h1>
            <PrimaryButton href='/lights'>{activeLightsCount ? activeLightsCount : 'no'} lights active</PrimaryButton>
        </Box>
    )
}