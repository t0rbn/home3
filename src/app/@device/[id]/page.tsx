import {List} from "@/components/layout/layouts";
import {BrightnessControls, RGBControls, WhiteSpectrumControls} from "@/app/@device/[id]/light-controls";
import {getDevice} from "@/app/tradfri-service";
import {notFound} from "next/navigation";

export default async function DevicePage(args: { params: Promise<{ id: string }> }) {
    const id = (await args.params).id
    const light = await getDevice(Number.parseInt(id));
    if (!light || light.type !== 'light') {
        return notFound()
    }

    return <List bigSpace>
        <h1>{light.name}</h1>
        <BrightnessControls light={light} />
        <WhiteSpectrumControls light={light} />
        <RGBControls light={light} />
    </List>
}

export const instant = false