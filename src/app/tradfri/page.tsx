import {getGroups} from "@/actions/tradfri-actions";
import {TradfriApiGroup} from "@/types/Tradfri";
import {GridLayout, ListLayout} from "@/components/layout/Layouts";
import {DeviceControlButton} from "@/components/buttons/Buttons";
import {PlugControlButton} from "@/app/tradfri/plugs/PlugControlButton";

export default async function TradfriPage() {
    const groups = await getGroups();

    return <ListLayout>
        {groups.map(g => <Group group={g} key={g.id}/>)}
    </ListLayout>
}

function Group(props: { group: TradfriApiGroup }) {
    const devices = [
        ...props.group.lights.map(l => ({name: l.name, component: <DeviceControlButton icon="lightbulb" name={l.name} status={l.brightness ? `${Math.round(100 * l.brightness)}%` : 'off'} href={`/tradfri/lights/${l.id}`} isActive={!!l.brightness} key={l.id} activeColor={l.color}/>})),
        ...props.group.plugs.map(p => ({name: p.name, component: <PlugControlButton plug={p}/>}))
    ]

    return <>
        <h1>{props.group.name}</h1>
        <GridLayout>
            {devices.sort((a, b) => a.name.localeCompare(b.name)).map(d => d.component)}
        </GridLayout>
        {/* space after group*/}
        < div/>
        < div/>
        < div/>
    </>
}