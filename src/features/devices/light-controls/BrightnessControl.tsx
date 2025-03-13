"use client"

import {setLightBrightness} from "@/actions/tradfri-actions";
import {useRouter} from "next/navigation";
import {MultiButtonGroup} from "@/components/buttons/multi-button-group/MultiButtonGroup";

interface BrightnessControlProps {
    lightId: number
}

export function BrightnessControl(props: BrightnessControlProps) {
    const router = useRouter();
    const handleClick = async (newBrightness: number) => setLightBrightness(props.lightId, newBrightness).then(router.refresh)

    return <MultiButtonGroup buttons={[
        {label: 'off', onClick: () => handleClick(0)},
        {label: '1%', onClick: () => handleClick(.01)},
        {label: '25%', onClick: () => handleClick(.25)},
        {label: '50%', onClick: () => handleClick(.5)},
        {label: '75%', onClick: () => handleClick(.75)},
        {label: '100%', onClick: () => handleClick(1)},
    ]}/>
}