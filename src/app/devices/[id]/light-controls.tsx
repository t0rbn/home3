"use client"

import {TradfriLight} from "@/types/Tradfri";
import {ButtonGroup} from "@/components/buttons/button-group";
import {Button} from "@/components/buttons/buttons";
import {startTransition, useOptimistic} from "react";
import {setLightBrightness, setLightColor} from "@/app/TradfriService";
import {useRouter} from "next/navigation";
import config from "@/config.json"
import {rgbArrayToHex} from "@/utils/colorUtils";
import {ColorInput} from "@/components/color-input/color-input";

export function BrightnessControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const [optimisticBrightness, setOptimisticBrightness] = useOptimistic(props.light.brightness)

    const handleChange = (value: number) => {
        startTransition(async () => {
            setOptimisticBrightness(value)
            await setLightBrightness(props.light.id, value)
            router.refresh()
        })
    }

    const stops: Array<{ icon?: string, value: number, activeFn?: () => boolean }> = [
        {icon: 'power_settings_new', value: 0, activeFn: () => !!optimisticBrightness},
        {value: 0.01},
        {value: 0.25},
        {value: 0.5},
        {value: .75},
        {icon: 'brightness_7', value: 1}
    ]

    return <ButtonGroup label="Brightness" connected fullWidth>
        {stops.map(stop => <Button
            key={stop.value}
            label=""
            icon={stop.icon}
            onClick={() => handleChange(stop.value)}
            variant={(stop.activeFn ? stop.activeFn() : stop.value <= optimisticBrightness) ? 'active' : 'default'}
        />)
        }
    </ButtonGroup>
}

export function WhiteSpectrumControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleChange = (c: string) => setLightColor(props.light.id, c).then(router.refresh)

    return <ButtonGroup connected fullWidth label="White Spectrum">
        {
            config.tradfri.colors.white.map(w => <Button
                label="&nbsp;"
                onClick={() => handleChange(w)}
                style={{backgroundColor: w}}
            />)
        }
    </ButtonGroup>
}

export function RgbControls(props: { light: TradfriLight }) {
    const router = useRouter();
    const handleChange = (c: string) => setLightColor(props.light.id, c).then(router.refresh)

    return <ButtonGroup label="RGB">
        {
            config.tradfri.colors.rgb.map(rgbArrayToHex).map(c => <Button
                label="&nbsp;"
                onClick={() => handleChange(c)}
                style={{backgroundColor: c}}
            />)
        }
        <ColorInput onSelected={handleChange} />
    </ButtonGroup>
}