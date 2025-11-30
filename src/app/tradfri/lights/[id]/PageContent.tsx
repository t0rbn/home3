"use client"

import {TradfriApiLight} from "@/types/Tradfri";
import {ButtonGroup, MainActionButton} from "@/components/buttons/Buttons";
import {setLightBrightness, setLightColor} from "@/actions/tradfri-actions";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import styles from "./PageContent.module.css"
import {HorizontalCenterLayout, ListLayout} from "@/components/layout/Layouts";

export function LightControlPageContent(props: { light: TradfriApiLight }) {
    const router = useRouter()

    const brightNess = useCallback((brightness: number) => setLightBrightness(props.light.id, brightness).then(() => router.refresh()), [router, props.light.id])
    const color = useCallback((color: string) => setLightColor(props.light.id, color).then(() => router.refresh()), [router, props.light.id])

    function WhiteControls() {
        if (!props.light.availableWhiteColors?.length || !props.light.brightness) {
            return null
        }

        return <ButtonGroup
            label="White"
            buttons={props.light.availableWhiteColors!.map((c) => ({
                label: '',
                color: c,
                key: c,
                onClick: () => color(c)
            }))}
        />
    }

    function RgbControls() {
        if (!props.light.availableRgbColors?.length || !props.light.brightness) {
            return null
        }

        return <ButtonGroup
            label="Color"
            buttons={props.light.availableRgbColors!.map((c) => ({
                label: '',
                color: c,
                key: c,
                onClick: () => color(c)
            }))}
        />
    }


    const isOn = props.light.brightness > 0

        const sanitizedColor = props.light?.color.startsWith("#") ? props.light?.color : `#${props.light.color}`

    return <ListLayout>
        <HorizontalCenterLayout>
            <MainActionButton
                color={sanitizedColor}
                onClick={() => brightNess(isOn ? 0 : 0.5)}
                isActive={isOn}
                label={`turn ${isOn ? 'off' : 'on'}`}
                icon="lightbulb_2"
            />
            <h1>{props.light.name}</h1>
        </HorizontalCenterLayout>

        <ButtonGroup
            label="Brightness"
            fullWidth
            connected
            buttons={[
                {icon: 'dark_mode', onClick: () => brightNess(0.01)},
                {label: '25%', onClick: () => brightNess(0.25)},
                {label: '50%', onClick: () => brightNess(0.5)},
                {label: '75%', onClick: () => brightNess(0.75)},
                {label: '100%', onClick: () => brightNess(1)}
            ]}/>

        <div className={styles.colorFlexBar}>
            <WhiteControls/>
            <RgbControls/>
        </div>
    </ListLayout>
}