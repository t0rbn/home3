"use client"

import {TradfriLight} from "@/types/Tradfri";
import {Button} from "@/components/buttons/buttons";
import {ButtonGroup} from "@/components/buttons/button-group";
import {useRouter} from "next/navigation";
import {startTransition, useOptimistic} from "react";
import {setLightBrightness, setLightColor} from "@/app/TradfriService";
import config from '@/config.json'
import {rgbArrayToHex} from "@/utils/colorUtils";
import {ColorInput} from "@/components/color-input/color-input";

export function BrightnessControls(props: { light: TradfriLight }) {
    const router = useRouter()
    const [optimisticBrightness, setOptimisticBrightness] = useOptimistic(props.light.brightness)

    const handleClick = (brightness: number) => startTransition(async () => {
        setOptimisticBrightness(brightness)
        await setLightBrightness(props.light.id, brightness)
        router.refresh()
    })

    const stops = [
        {icon: 'power_settings_new', value: 0, activeFn: () => !!props.light.brightness},
        {value: 0.01},
        {value: 0.25},
        {value: 0.5},
        {value: 0.75},
        {value: 1}
    ]

    return <ButtonGroup label="Brightness" connected>
        {
            stops.map(stop => <Button
                icon={stop.icon}
                onClick={() => handleClick(stop.value)}
                isActive={stop.activeFn ? stop.activeFn() : optimisticBrightness >= stop.value}
                key={stop.value}
            />)
        }
    </ButtonGroup>
}

export function WhiteSpectrumControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleClick = (c: string) => setLightColor(props.light.id, c).then(router.refresh)

    if (props.light.spectrum === 'none') {
        return null
    }

    return <ButtonGroup label="White Spectrum" connected>
        {
            config.tradfri.colors.white.map(c => <Button
                onClick={() => handleClick(c)}
                style={{backgroundColor: c}}
                key={c}
            />)
        }
    </ButtonGroup>
}

export function RGBControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleClick = (c: string) => setLightColor(props.light.id, c).then(router.refresh)

    if (props.light.spectrum !== 'rgb') {
        return null
    }

    return <ButtonGroup label="RGB Spectrum">
        {
            config.tradfri.colors.rgb.map(rgbArrayToHex).map(c => <Button
                onClick={() => handleClick(c)}
                style={{backgroundColor: c}}
                key={c}
            />)
        }
        <ColorInput onSelected={handleClick} />
    </ButtonGroup>
}