import {getDevice} from "@/app/tradfri/TradfriService";
import {LightControls, PlugControls} from "@/app/tradfri/[id]/Controls";


export default async function DevicePage({params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    const device = await getDevice(Number.parseInt(id));

    if (device.type === 'light') {
        return <LightControls light={device}/>;
    }

    if (device.type === 'plug') {
        return <PlugControls plug={device}/>;
    }

    return <div>Unknown device type. what.</div>

}