import {TradfriGroup} from "@/types/Tradfri";
import {GridLayout, ListLayout} from "@/components/layout/layouts";
import {DeviceButton} from "@/app/devices/device-controls";
import {getGroups} from "@/app/TradfriService";
import {connection} from "next/server";


export default async function DevicesPage() {
    await connection();
    const groups = await getGroups()

    return <ListLayout largeGap>
        {groups.map((group: TradfriGroup) => <ListLayout key={group.id}>
            <h1>{group.name}</h1>
            <GridLayout>
                {
                    group.devices
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(d => <DeviceButton device={d} key={d.id}/>)
                }
            </GridLayout>
        </ListLayout>)}
    </ListLayout>
}