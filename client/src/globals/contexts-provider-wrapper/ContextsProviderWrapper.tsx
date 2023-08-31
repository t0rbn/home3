import {PropsWithChildren} from "react";
import {LightGroupsProvider} from "../../lights/LightGroupsContext";
import {ScenesProvider} from "../../scenes/ScenesContext";
import {ClimateContextProvider} from "../../climate/ClimateContext";

export default function ContextsProviderWrapper(props: PropsWithChildren) {
    return (
        <LightGroupsProvider>
            <ScenesProvider>
                <ClimateContextProvider>
                    {props.children}
                </ClimateContextProvider>
            </ScenesProvider>
        </LightGroupsProvider>
    )
}