import {getDevice} from "@/app/TradfriService";
import {ListLayout} from "@/components/layout/layouts";
import {BrightnessControls, RgbControls, WhiteSpectrumControls} from "@/app/devices/[id]/light-controls";
import {notFound} from "next/navigation";
import {Activity} from "react";

export default async function LightControlPage({params}: { params: Promise<{ id: string }> }) {
    const id = (await params).id
    const light = await getDevice(Number.parseInt(id))
    if (!light || light.type !== 'light') {
        return notFound()
    }

    return <ListLayout largeGap>
        <h1>{light.name}</h1>
        <BrightnessControls light={light}/>

        <Activity mode={light.spectrum !== 'none' ? 'visible' : 'hidden'}>
            <WhiteSpectrumControls light={light}/>
        </Activity>

        <Activity mode={light.spectrum === 'rgb' ? 'visible' : 'hidden'}>
            <RgbControls light={light}/>
        </Activity>
    </ListLayout>
}