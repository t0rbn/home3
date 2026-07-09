"use client"

import {setLightBrightness, setLightColor, togglePlug} from "@/app/tradfri/TradfriService";
import {ListLayout} from "@/components/layout/ListLayout/ListLayout";
import {HorizontalCenterLayout} from "@/components/layout/HorizontalCenterLayout/HorizontalCenterLayout";
import {ButtonGroup} from "@/components/buttons/ButtonGroup";
import {Button} from "@/components/buttons/Buttons";
import {TradfriLight, TradfriPlug} from "@/types/Tradfri";
import {useRouter} from "next/navigation";
import {Activity} from "react";
import config from "@/config.json"
import {rgbArrayToHex} from "@/utils/colorUtils";
import {Icon} from "@/components/icon/Icon";
import styles from "./page.module.css"

export function LightControls(props: { light: TradfriLight }) {
    const router = useRouter();

    return <ListLayout largeGap>
        <HorizontalCenterLayout>
            <Icon icon="lightbulb_2" className={styles.heroIcon}/>
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
                    onClick={() => setLightBrightness(props.light.id, b.value).then(router.refresh)}
                    variant={(b.value === 0 ? props.light.brightness : (props.light.brightness >= b.value)) ? 'active' : 'default'}
                />)
            }
        </ButtonGroup>

        <Activity mode={(props.light.spectrum !== 'none' && props.light.brightness) ? 'visible' : 'hidden'}>
            <ButtonGroup label="White Spectrum">
                {config.tradfri.colors.white.map((w) => <Button
                    key={w}
                    onClick={() => setLightColor(props.light.id, w).then(router.refresh)}
                    label="&nbsp;"
                    style={{backgroundColor: w}}
                />)}
            </ButtonGroup>
        </Activity>

        <Activity mode={(props.light.spectrum === 'rgb' && props.light.brightness) ? 'visible' : 'hidden'}>
            <ButtonGroup label="RGB">
                {config.tradfri.colors.rgb.map(rgbArrayToHex).map((c) => <Button
                    key={c}
                    onClick={() => setLightColor(props.light.id, c).then(router.refresh)}
                    label="&nbsp;"
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
            <Icon icon="outlet" className={styles.heroIcon}/>
            <h1>{props.plug.name}</h1>
        </HorizontalCenterLayout>
        <ButtonGroup fullWidth>
            <Button
                onClick={() => togglePlug(props.plug.id).then(router.refresh)}
                label={props.plug.isOn ? 'Turn Off' : 'Turn On'}
                icon="power"
                variant={(props.plug.isOn ? 'active' : 'default')}
            />
        </ButtonGroup>
    </ListLayout>
}
