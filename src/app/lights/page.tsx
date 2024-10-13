import {Metadata} from "next";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import {LightControl} from "@/app/lights/light-control/LightControl";
import {Fragment} from "react";
import {getGroups} from "@/actions/tradfri-actions";
import {PlugControl} from "@/app/lights/plug-control/PlugControl";
import {RestartAppButton} from "@/app/lights/RestartAppButton";

export const metadata: Metadata = {
    title: "Lights - home3",
};

export default async function LightsPage() {
    const groups = await getGroups();

    return <GridContainer cols={1}>
        {groups.map(g => <Fragment key={g.id}>
            <h1>{g.name}</h1>
            {g.lights.toSorted((a, b) => a.name.localeCompare(b.name)).map(l => <LightControl light={l} key={l.id}/>)}
            <GridContainer cols={3} colsMedium={2}>
                {g.plugs.toSorted((a, b) => a.name.localeCompare(b.name)).map(l => <PlugControl plug={l} key={l.id}/>)}
            </GridContainer>
        </Fragment>)}

        <h1>Settings</h1>
        <RestartAppButton/>

    </GridContainer>
}

export const dynamic = 'force-dynamic'