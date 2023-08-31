import AppLayout from "../../globals/layouts/app-layout/AppLayout";
import {useParams} from "react-router-dom";
import {useLightGroupsContext} from "../LightGroupsContext";
import {useEffect, useState} from "react";
import {ApiLight, ApiWhiteSpectrumiLight} from "../../../../shared/types/Light";
import BrightnessSelector from "./brightness-selector/BrightnessSelector";
import WhiteTemperatureSelector from "./white-temperature-selector/WhiteTemperatureSelector";
import RgbColorSelector from "./rgb-color-selector/RgbColorSelector";
import Box from "../../globals/box/Box";

export default function LightControl() {
    const lightId = useParams().id;
    const context = useLightGroupsContext();
    const [light, setLight] = useState<ApiLight | undefined>(undefined);

    useEffect(() => {
        setLight(context.lightGroups.map(g => g.lights).flat().find(l => l.id === lightId) ?? undefined)
    }, [context.lightGroups, lightId])

    const setColor = (hexColor: string) => {
        context.setLightColor(light!.id, hexColor)
    }

    const setBrightness = (value: number) => {
        context.setLightBrightness(light!.id, value)
    }

    const setWhiteTemperature = (value: number) => {
        context.setLightWhiteTemperature(light!.id, value)
    }

    if (!light) {
        return null
    }

    const conditionalColorTemperatureSelector = () => {
        if (light?.spectrum !== 'white') {
            return null
        }
        return (
            <Box>
                <h1>Color Temperature</h1>
                <WhiteTemperatureSelector onSelected={(v) => setWhiteTemperature(v)}
                                          current={(light as ApiWhiteSpectrumiLight).whiteTemperature}/>
            </Box>
        )
    }

    const conditionalRgbColorSelector = () => {
        if (light?.spectrum !== 'rgb') {
            return null
        }
        return (
            <Box>
                <h1>Color</h1>
                <RgbColorSelector onSelected={(v) => setColor(v)}/>
            </Box>
        )
    }

    return (
        <AppLayout name={light.name}>
            <Box>
                <h1>Brightness</h1>
                <BrightnessSelector current={light!.brightness} onSelected={(v) => setBrightness(v)}/>
            </Box>
            {conditionalColorTemperatureSelector()}
            {conditionalRgbColorSelector()}
        </AppLayout>
    )
}