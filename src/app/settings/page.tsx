import {Metadata} from "next";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import {RestartAppButton} from "@/app/lights/RestartAppButton";

export const metadata: Metadata = {
    title: "Settings - home3",
};

export default async function LightsPage() {
    return <GridContainer cols={1}>
        <RestartAppButton/>
    </GridContainer>
}

export const dynamic = 'force-dynamic'