import {getGroups} from "@/actions/tradfri-actions";
import {TradfriApiGroup} from "@/types/Tradfri";
import {GridLayout, ListLayout} from "@/components/layout/Layouts";
import {DeviceLinkButton} from "@/components/buttons/Buttons";

export default async function TradfriPage() {
    const groups = await getGroups();

    return <ListLayout>
        {groups.map(g => <Group group={g} key={g.id} />)}
    </ListLayout>
}

function Group(props: {group: TradfriApiGroup} ){
    const devices = [
        ...props.group.lights.map(l => ({name: l.name, component: <DeviceLinkButton icon="lightbulb" name={l.name} status={l.brightness ? `${Math.round(100 * l.brightness)}%` : 'off'} href={`/tradfri/lights/${l.id}`} isActive={!!l.brightness} />})),
        ...props.group.plugs.map(p =>({name: p.name, component: <DeviceLinkButton icon="toggle_on" name={p.name} status={p.isOn ? 'on' : 'off'} href={`/tradfri/plugs/${p.id}`} isActive={p.isOn} />}))
    ]



    return <>
        <h1>{ props.group.name}</h1>
        <GridLayout>
            {devices.sort((a,b) => a.name.localeCompare(b.name)).map(d => d.component)}
        </GridLayout>
    </>
}