import SubPageLayout from "../../globals/SubPageLayout";
import {useParams} from "react-router-dom";
import {useLightGroupsContext} from "../LightGroupsContext";
import {useEffect, useState} from "react";
import {ApiLight, ApiRgbLight, ApiWhiteSpectrumiLight} from "../../../../shared/types/Light";
import BrightnessSelector from "./BrightnessSelector";
import WhiteTemperatureSelector from "./WhiteTemperatureSelector";
import RgbColorSelector from "./RgbColorSelector";

export default function LightControl() {
    const lightId = useParams().id;
    const context = useLightGroupsContext();
    const [light, setLight] = useState<ApiLight | undefined>(undefined);

    useEffect(() => {
        setLight(context.lightGroups.map(g => g.lights).flat().find(l => l.id === lightId) ?? undefined)
    }, [context.lightGroups])

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
        return <WhiteTemperatureSelector onSelected={(v) => setWhiteTemperature(v)} current={(light as ApiWhiteSpectrumiLight).whiteTemperature} />
    }

    const conditionalRgbColorSelector = () => {
        if (light?.spectrum !== 'rgb') {
            return null
        }
        return <RgbColorSelector onSelected={(v) => setColor(v)} />
    }

    return (
        <SubPageLayout>
            <h1>{light.name}</h1>
            <BrightnessSelector current={light!.brightness} onSelected={(v) => setBrightness(v)}/>
            {conditionalColorTemperatureSelector()}
            {conditionalRgbColorSelector()}
        </SubPageLayout>
    )
}