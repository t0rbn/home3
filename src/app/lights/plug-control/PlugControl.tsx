"use client";

import {Box} from "@/components/box/Box";
import {GridContainer} from "@/components/containers/grid/GridContainer";
import {useRouter} from "next/navigation";
import PrimaryButton from "@/components/buttons/primary-button/PrimaryButton";
import {TradfriPlug} from "@/types/Tradfri";
import {togglePlug} from "@/actions/tradfri-actions";
import {Icon} from "@/components/icon/Icon";

interface PlugControlProps {
    plug: TradfriPlug
}

export function PlugControl(props: PlugControlProps) {
    const router = useRouter();

    const toggle = () => {
        togglePlug(props.plug.id).then(router.refresh)
    }

    return <Box>
        <GridContainer cols={1}>
            <h2>{props.plug.name}</h2>
            <PrimaryButton onClick={toggle}><Icon icon="power_settings_new" /></PrimaryButton>
        </GridContainer>
    </Box>
}