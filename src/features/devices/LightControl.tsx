"use client";

import config from "@/config.json"
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {TradfriLight} from "@/types/Tradfri";
import {getLight} from "@/actions/tradfri-actions";
import {Section} from "@/components/containers/section/Section";

interface LightControlProps {
    lightId: number;
}

export function LightControl(props: LightControlProps) {
    const router = useRouter();

    const [light, setLight] = useState<TradfriLight | undefined>(undefined);
    useEffect(() => {
        getLight(props.lightId).then(setLight)
    }, [props.lightId]);


    const colors = [
        ...(light?.spectrum !== 'none' ? config.tradfri.colors.whiteTemperatures : []),
        ...(light?.spectrum === 'rgb' ? config.tradfri.colors.rgb : [])
    ].map(c => {
        if (typeof c === 'string') {
            return c
        }
        return '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join('')
    })


    return <Section level="primary" title={light?.name ?? '---'}>

    </Section>
    // return <Box>
    //     <GridContainer cols={1}>
    //         <h2>{props.light.name}</h2>
    //         <div>
    //             <Slider
    //                 min={0}
    //                 max={1}
    //                 step={.01}
    //                 value={brightness}
    //                 onChange={handleBrightnessChange}
    //             />
    //         </div>
    //         <GridContainer cols={6} colsMedium={3}>
    //             {colors.map(c => <PrimaryButton key={c} style={{backgroundColor: c, backgroundImage: jsStyles.gradientColorbutton}} onClick={() => handleColorChange(c)}>&nbsp;</PrimaryButton>)}
    //         </GridContainer>
    //     </GridContainer>
    // </Box>
}