import {PropsWithChildren} from "react";
import {LightGroupsProvider} from "../lights/LightGroupsContext";
import {ScenesProvider} from "../scenes/ScenesContext";

export default function ContextsProviderWrapper(props: PropsWithChildren) {
    return (
        <LightGroupsProvider>
            <ScenesProvider>
                {props.children}
            </ScenesProvider>
        </LightGroupsProvider>
    )
}