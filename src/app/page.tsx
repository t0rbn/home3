import SceneSelector from "@/features/scenes/scene-selector/SceneSelector";
import GroupedDeviceButtons from "@/features/devices/GroupedDeviceButtons";
import {Section} from "@/components/containers/section/Section";

export default function Home() {
    return <>
        <Section level="primary" title="Scenes"><SceneSelector/></Section>
        <Section level="primary" title="Devices"><GroupedDeviceButtons/></Section>
    </>
}
