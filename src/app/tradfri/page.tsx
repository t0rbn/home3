import {getGroups} from "@/actions/tradfri-actions";
import {TradfriApiGroup} from "@/types/Tradfri";
import {ListLayout} from "@/components/layout/Layouts";
import {DeviceControlButton, PlugControlButton, TradfriButtonGroup} from "@/app/tradfri/TradfriButtons";

export default async function TradfriPage() {
    const groups = await getGroups();

    return <ListLayout>
        {groups.map(g => <TradfriButtonGroup group={g} key={g.id}/>)}
    </ListLayout>
}