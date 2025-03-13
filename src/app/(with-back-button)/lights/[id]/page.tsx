import {Section} from "@/components/containers/section/Section";
import {notFound} from "next/navigation";
import {BrightnessControl} from "@/features/devices/light-controls/BrightnessControl";
import {getLight} from "@/actions/tradfri-actions";
import config from "@/config.json";
import {ColorControl} from "@/features/devices/light-controls/ColorControl";

export default async function LightControlPage({params}: { params: Promise<any> }) {
    const lightId: string = (await params).id
    const light = await getLight(Number.parseInt(lightId))

    if (!light) {
        return notFound()
    }

    function BrightnessSection() {
        if (!light) {
            return null
        }

        return <Section level="secondary" title={`Brightness  (${light.brightness ? (`${Math.round(light.brightness * 100)}%`) : 'off'})`}>
            <BrightnessControl lightId={light.id}/>
        </Section>
    }

    function ColorSection() {
        if (!light?.brightness) {
            return null
        }

        const colors = [
            ...(light.spectrum !== 'none' ? config.tradfri.colors.whiteTemperatures : []),
            ...(light.spectrum === 'rgb' ? config.tradfri.colors.rgb : [])
        ].map(c => {
            if (typeof c === 'string') {
                return c
            }
            return `#${c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join('')}`
        })

        if (!colors.length) {
            return null
        }
        return <Section level="secondary" title="Color">
            <ColorControl lightId={light.id} colors={colors}/>
        </Section>

    }

    return <>
        <Section level="primary" title={light?.name}/>
        <BrightnessSection/>
        <ColorSection/>
    </>
}

export const dynamic = 'force-dynamic'