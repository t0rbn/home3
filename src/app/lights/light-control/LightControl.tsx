"use client";

import {Box} from "@/components/box/Box";
import config from "@/config.json"
import {GridContainer} from "@/components/containers/grid/GridContainer";
import Slider from "@/components/slider/Slider";
import {useRouter} from "next/navigation";
import {useState} from "react";
import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import {TradfriLight} from "@/types/Tradfri";
import {setLightBrightness, setLightColor} from "@/actions/tradfri-actions";

interface LightControlProps {
    light: TradfriLight;
}

export function LightControl(props: LightControlProps) {
    const router = useRouter();

    const [brightness, setBrightness] = useState<number>(props.light.brightness)

    const [debounceTImeout, setDebounceTImeout] = useState<any>(null);
    const handleBrightnessChange = (newVal: number) => {
        setBrightness(newVal)

        if (debounceTImeout) {
            clearTimeout(debounceTImeout)
            setDebounceTImeout(null)
        }
        setDebounceTImeout(setTimeout(() => {
            setLightBrightness(props.light.id, newVal).then(router.refresh)
        }, config.tradfri.transitionTimeMs))
    }


    const colors = [
        ...(props.light.spectrum !== 'none' ? config.tradfri.colors.whiteTemperatures : []),
        ...(props.light.spectrum === 'rgb' ? config.tradfri.colors.rgb : [])
    ].map(c => {
        if (typeof c === 'string') {
            return c
        }
        return '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join('')
    })

    const handleColorChange = (newHexColor: string) => {
        setLightColor(props.light.id, newHexColor).then(router.refresh)
    }

    return <Box>
        <GridContainer cols={1}>
            <h2>{props.light.name}</h2>
            <div>
                <Slider
                    min={0}
                    max={1}
                    step={.05}
                    value={brightness}
                    onChange={handleBrightnessChange}
                />
            </div>

                <GridContainer cols={6} colsMedium={3}>
                    {colors.map(c => <PrimaryButton key={c} style={{backgroundColor: c}} onClick={() => handleColorChange(c)}>&nbsp;</PrimaryButton>)}
                </GridContainer>
        </GridContainer>

    </Box>
}