import {Metadata} from "next";
import {GridContainer, GridRowSpacer} from "@/components/containers/grid/GridContainer";
import {getTradfriGroups} from "@/actions/tradfri-actions";
import {LightControl} from "@/app/lights/light-control/LightControl";
import {Fragment} from "react";
import {RestartAppButton} from "@/app/lights/RestartAppButton";

export const metadata: Metadata = {
    title: "Lights - home3",
};

export default async function LightsPage() {
    const groups = (await getTradfriGroups()).filter(g => g.lights.length)

    return <GridContainer cols={1}>
        {groups.map(g => <Fragment key={g.id}>
            <h1>{g.name}</h1>
            {g.lights.map(l => <LightControl light={l} key={l.id} />)}
            <GridRowSpacer />
        </Fragment>)}
        <RestartAppButton />
    </GridContainer>
}

export const dynamic = 'force-dynamic'