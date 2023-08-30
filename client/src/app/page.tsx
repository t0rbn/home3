

import Scenes from "@/app/scenes/Scenes";
import {LightGroupsProvider} from "@/app/lights/LightGroupsContext";
import {ScenesProvider} from "@/app/scenes/ScenesContext";
import LightGroupsFloorplan from "@/app/lights/groups/LightGroupsFloorplan";

export default function Home() {
    return (
        <LightGroupsProvider>
            <ScenesProvider>
                <Scenes/>
                <LightGroupsFloorplan />
            </ScenesProvider>
        </LightGroupsProvider>

    )
}
