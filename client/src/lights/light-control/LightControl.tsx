import {useLightGroupsContext} from "../LightGroupsContext";
import {useEffect, useState} from "react";
import {ApiLight, ApiWhiteSpectrumiLight} from "../../../../shared/types/Light";
import BrightnessSelector from "./brightness-selector/BrightnessSelector";
import WhiteTemperatureSelector from "./white-temperature-selector/WhiteTemperatureSelector";
import RgbColorSelector from "./rgb-color-selector/RgbColorSelector";
import Box from "../../globals/box/Box";
import ListLayout from "../../globals/layouts/list-layout/ListLayout";

interface LightControlProps {
    id: string;
}

export default function LightControl(props: LightControlProps) {
    const context = useLightGroupsContext();
    const [light, setLight] = useState<ApiLight | undefined>(undefined);

    useEffect(() => {
        setLight(context.lightGroups.map(g => g.lights).flat().find(l => l.id === props.id) ?? undefined)
    }, [context.lightGroups, props.id])

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
            <WhiteTemperatureSelector onSelected={(v) => setWhiteTemperature(v)}
                                      current={(light as ApiWhiteSpectrumiLight).whiteTemperature}/>
        )
    }

    const conditionalRgbColorSelector = () => {
        if (light?.spectrum !== 'rgb') {
            return null
        }
        return (
            <RgbColorSelector onSelected={(v) => setColor(v)}/>
        )
    }

    return (
        <Box>
            <ListLayout>
                <h2>{light.name}</h2>
                <BrightnessSelector current={light.brightness} onSelected={(v) => setBrightness(v)}/>
                {conditionalColorTemperatureSelector()}
                {conditionalRgbColorSelector()}
            </ListLayout>
        </Box>
    )
}