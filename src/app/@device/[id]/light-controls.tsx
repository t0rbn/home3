"use client"

import {TradfriLight} from "@/types/tradfri";
import {IconButton} from "@/components/buttons/buttons";
import {ButtonGroup} from "@/components/buttons/button-group";
import {useRouter} from "next/navigation";
import {startTransition, useOptimistic} from "react";
import {setLightBrightness, setLightColor, setLightColorTemperature} from "@/app/tradfri-service";
import config from '@/config.json'
import {rgbArrayToHex} from "@/utils/color-utils";
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
        {icon: 'power_settings_new', value: 0, activeFn: () => !!optimisticBrightness},
        {value: 0.01},
        {value: 0.25},
        {value: 0.5},
        {value: 0.75},
        {value: 1}
    ]

    return <ButtonGroup label="Brightness" connected>
        {
            stops.map(stop => <IconButton
                icon={stop.icon}
                ariaLabel={stop.icon ? 'Turn off' : `Set brightness to ${stop.value * 100}%`}
                onClick={() => handleClick(stop.value)}
                isActive={stop.activeFn ? stop.activeFn() : optimisticBrightness >= stop.value}
                key={stop.value}
            />)
        }
    </ButtonGroup>
}

export function WhiteSpectrumControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleClick = (value: number) => setLightColorTemperature(props.light.id, value).then(router.refresh)

    if (props.light.spectrum !== 'white') {
        return null
    }

    const whites = config.tradfri.colors.white

    return <ButtonGroup label="White Spectrum" connected>
        {
            whites.map((c, i) => <IconButton
                ariaLabel={`Set color temperature ${c}`}
                onClick={() => handleClick(whites.length > 1 ? i / (whites.length - 1) : 0)}
                style={{backgroundColor: c}}
                key={c}
            />)
        }
    </ButtonGroup>
}

export function RgbSpectrumControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleClick = (c: string) => setLightColor(props.light.id, c).then(router.refresh)

    if (props.light.spectrum !== 'rgb') {
        return null
    }

    return <>
        <ButtonGroup label="White Spectrum" connected>
            {
                config.tradfri.colors.white.map(c => <IconButton
                    ariaLabel={`Set white color ${c}`}
                    onClick={() => handleClick(c)}
                    style={{backgroundColor: c}}
                    key={c}
                />)
            }
        </ButtonGroup>
        <ButtonGroup label="RGB">
        {
            config.tradfri.colors.rgb.map(rgbArrayToHex).map(c => <IconButton
                ariaLabel={`Set RGB color ${c}`}
                onClick={() => handleClick(c)}
                style={{backgroundColor: c}}
                key={c}
            />)
        }
        <ColorInput onSelected={handleClick} />
    </ButtonGroup>
        </>
}