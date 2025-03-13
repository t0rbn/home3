import {getGroups} from "@/actions/tradfri-actions";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import {LightDeviceButton} from "@/features/devices/device-buttons/LightDeviceButton";
import {PlugDeviceButton} from "@/features/devices/device-buttons/PlugDeviceButton";
import {Section} from "@/components/containers/section/Section";

export default async function GroupedDeviceButtons() {
    const groups = await getGroups();

    return <GridContainer cols={1}>
        {groups.map(g => <Section key={g.id} title={g.name} level="secondary">
            <GridContainer cols={4} colsMedium={2}>
                {g.lights.toSorted((a, b) => a.name.localeCompare(b.name)).map(l => <LightDeviceButton light={l} key={l.id}/>)}
                {g.plugs.toSorted((a, b) => a.name.localeCompare(b.name)).map(l => <PlugDeviceButton plug={l} key={l.id}/>)}
            </GridContainer>
        </Section>)}
    </GridContainer>
}