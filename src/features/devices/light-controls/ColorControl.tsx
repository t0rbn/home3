"use client";

import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import {useRouter} from "next/navigation";
import {setLightColor} from "@/actions/tradfri-actions";
import {GridContainer} from "@/components/containers/grid/GridContainer";

interface ColorControlProps {
    lightId: number;
    colors: Array<string>
}

export function ColorControl(props: ColorControlProps) {
    const router = useRouter();
    const handleClick = async (newColor: string) => setLightColor(props.lightId, newColor).then(router.refresh)

    return <GridContainer cols={Math.min(props.colors.length, 3)} colsMedium={3}>
        {props.colors.map(c => <PrimaryButton
            key={c}
            onClick={() => handleClick(c)}
            style={{backgroundColor: c}}
        >
            &nbsp;
        </PrimaryButton>)}
    </GridContainer>
}