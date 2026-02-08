"use client"

import {TradfriApiLight} from "@/types/Tradfri";
import {Button} from "@/components/buttons/Buttons";
import {setLightBrightness, setLightColor} from "@/actions/tradfri-actions";
import {useCallback} from "react";
import {useRouter} from "next/navigation";
import styles from "./PageContent.module.css"
import {HorizontalCenterLayout, ListLayout} from "@/components/layout/Layouts";
import {ButtonGroup} from "@/components/buttons/ButtonGroup";
import {cns} from "@/utils/cns";

export function LightControlPageContent(props: { light: TradfriApiLight }) {
    const router = useRouter()

    const isOn = props.light.brightness > 0
    const sanitizedColor = props.light?.color.startsWith("#") ? props.light?.color : `#${props.light.color}`
    const brightNess = useCallback((brightness: number) => setLightBrightness(props.light.id, brightness).then(() => router.refresh()), [router, props.light.id])
    const color = useCallback((color: string) => setLightColor(props.light.id, color).then(() => router.refresh()), [router, props.light.id])

    function ColorButton(props: { color: string }) {
        return <Button
            label="&nbsp;"
            onClick={() => color(props.color)}
            style={{backgroundColor: props.color}}
        />
    }

    function BrightnessButton(p: { icon?: string, label?: string, value: number }) {
        return <Button
            onClick={() => brightNess(p.value)}
            icon={p.icon}
            label={p.label}
            variant={props.light.brightness >= p.value ? 'active' : 'default'}
        />
    }

    const actionButtonStyle = isOn ? {'backgroundColor': sanitizedColor} : undefined

    return <ListLayout largeGap animated>
        <HorizontalCenterLayout>
            <Button
                onClick={() => brightNess(isOn ? 0 : 0.5)}
                style={actionButtonStyle}
                className={cns(styles.actionButton, isOn ? styles.on : undefined)}
                label={`turn ${isOn ? 'off' : 'on'}`}
                icon="lightbulb_2"
                size="huge"
            />
            <h1>{props.light.name}</h1>
        </HorizontalCenterLayout>

        <ButtonGroup
            label="Brightness"
            fullWidth
            connected>
            {
                [
                    {icon: 'dark_mode', value: 0.01},
                    {label: '25%', value: 0.25},
                    {label: '50%', value: 0.5},
                    {label: '75%', value: 0.75},
                    {label: '100%', value: 1},
                ].map((p) => <BrightnessButton {...p} key={p.value}/>)
            }

        </ButtonGroup>

        {
            (isOn && props.light.availableWhiteColors?.length)
                ? <ButtonGroup label="White">{props.light.availableWhiteColors!.map((c) => <ColorButton key={c} color={c}/>)}</ButtonGroup>
                : null
        }
        {
            (isOn && props.light.availableRgbColors?.length)
                ? <ButtonGroup label="Color">{props.light.availableRgbColors!.map((c) => <ColorButton key={c} color={c}/>)}</ButtonGroup>
                : null
        }
    </ListLayout>
}