import {getGroups} from "@/actions/tradfri-actions";
import {TradfriApiGroup} from "@/types/Tradfri";
import {GridLayout, ListLayout} from "@/components/layout/Layouts";
import {DeviceControlButton, PlugControlButton} from "@/app/tradfri/TradfriButtons";

export default async function TradfriPage() {
    const groups = await getGroups();

    return <ListLayout>
        {groups.map(g => <Group group={g} key={g.id}/>)}
    </ListLayout>
}

function Group(props: { group: TradfriApiGroup }) {
    const devices = [
        ...props.group.lights.map(l => ({name: l.name, component: <DeviceControlButton activeColor={l.color} icon="lightbulb_2" name={l.name} status={l.brightness ? `${Math.round(100 * l.brightness)}%` : 'off'} href={`/tradfri/lights/${l.id}`} isActive={!!l.brightness} key={l.id}/>})),
        ...props.group.plugs.map(p => ({name: p.name, component: <PlugControlButton plug={p}/>}))
    ]

    return <>
        <h1>{props.group.name}</h1>
        <ListLayout>
            {devices.sort((a, b) => a.name.localeCompare(b.name)).map(d => d.component)}
        </ListLayout>
        {/* space after group*/}
        < div/>
        < div/>
        < div/>
    </>
}