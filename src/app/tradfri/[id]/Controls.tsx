"use client"

import {setLightBrightness, setLightColor, togglePlug} from "@/app/tradfri/TradfriService";
import {ListLayout} from "@/components/layout/ListLayout/ListLayout";
import {HorizontalCenterLayout} from "@/components/layout/HorizontalCenterLayout/HorizontalCenterLayout";
import {ButtonGroup} from "@/components/buttons/ButtonGroup";
import {Button} from "@/components/buttons/Buttons";
import {TradfriLight, TradfriPlug} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {Activity, startTransition, useOptimistic} from "react";
import config from "@/config.json"
import {rgbArrayToHex} from "@/utils/colorUtils";
import {Icon} from "@/components/icon/Icon";
import styles from "./page.module.css"
import {cns} from "@/utils/cns";

export function LightControls(props: { light: TradfriLight }) {
    const router = useRouter();

    const [optimisticBrightness, setOptimisticBrightness] = useOptimistic(props.light.brightness)
    const [optimisticColor, setOptimisticColor] = useOptimistic(props.light.color)

    const handleBrightnessChange = (brightness: number) => {
        startTransition(() => {
            setOptimisticBrightness(brightness)
            setLightBrightness(props.light.id, brightness).then(router.refresh)
        })
    }

    const handleColorChange = (color: string) => {
        startTransition(() => {
            setOptimisticColor(color)
            setLightColor(props.light.id, color).then(router.refresh)
        })
    }

    return <ListLayout largeGap>
        <HorizontalCenterLayout>
            <div className={cns(props.light.brightness > 0 ? styles.lightHeroContainer : null)}
                 style={{'--light-accent-color': optimisticColor} as any}>
                <Icon icon="lightbulb_2" className={styles.heroIcon}/>
            </div>
            <h1>{props.light.name}</h1>
        </HorizontalCenterLayout>

        <ButtonGroup fullWidth connected label="Brightness">
            {
                [
                    {value: 0, icon: 'power_settings_new'},
                    {value: 0.01},
                    {value: 0.25},
                    {value: 0.5},
                    {value: 0.75},
                    {value: 1, icon: 'light_mode'}

                ].map((b) => <Button
                    key={b.value}
                    icon={b.icon}
                    ariaLabel={"Brightness " + b.value}
                    onClick={() => handleBrightnessChange(b.value)}
                    variant={(b.value === 0 ? optimisticBrightness : (optimisticBrightness >= b.value)) ? 'active' : 'default'}
                />)
            }
        </ButtonGroup>

        <Activity mode={(props.light.spectrum !== 'none' && props.light.brightness) ? 'visible' : 'hidden'}>
            <ButtonGroup label="White Spectrum">
                {config.tradfri.colors.white.map((w) => <Button
                    key={w}
                    onClick={() => handleColorChange(w)}
                    label="&nbsp;"
                    ariaLabel={`Color ${w}`}
                    style={{backgroundColor: w}}
                />)}
            </ButtonGroup>
        </Activity>

        <Activity mode={(props.light.spectrum === 'rgb' && props.light.brightness) ? 'visible' : 'hidden'}>
            <ButtonGroup label="RGB">
                {config.tradfri.colors.rgb.map(rgbArrayToHex).map((c) => <Button
                    key={c}
                    onClick={() => handleColorChange(c)}
                    label="&nbsp;"
                    ariaLabel={`Color ${c}`}
                    style={{backgroundColor: c}}
                />)}
            </ButtonGroup>
        </Activity>
    </ListLayout>

}

export function PlugControls(props: { plug: TradfriPlug }) {
    const router = useRouter();

    return <ListLayout largeGap>
        <HorizontalCenterLayout>
            <Icon icon="power" className={styles.heroIcon}/>
            <h1>{props.plug.name}</h1>
        </HorizontalCenterLayout>
        <ButtonGroup fullWidth>
            <Button
                onClick={() => togglePlug(props.plug.id).then(router.refresh)}
                label={props.plug.isOn ? 'Turn Off' : 'Turn On'}
                icon="toggle_on"
                variant={(props.plug.isOn ? 'active' : 'default')}
            />
        </ButtonGroup>
    </ListLayout>
}
