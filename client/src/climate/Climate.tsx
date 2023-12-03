import React, {useEffect, useState} from "react";
import {ApiClimateData} from "../../../shared/types/Climate";
import {useClimateContext} from "./ClimateContext";
import SpinnerBox from "../globals/spinner/SpinnerBox";
import KeyValue from "../globals/key-value/KeyValue";
import ContentGridLayout from "../globals/layouts/content-grid-layout/ContentGridLayout";

export default function Climate() {
    const [data, setData] = useState<ApiClimateData | undefined>(undefined);
    const context = useClimateContext();

    useEffect(() => {
        setData(context.data);
    }, [context.data])

    if (!data) {
        return <SpinnerBox></SpinnerBox>
    }

    const tempFormatted = `${data?.tempC} °C`
    const humidtyFormatted = `${Math.round((data?.humidity ?? -1) * 100)} %`

    return (
        <ContentGridLayout cols={2} colsSmall={2}>
            <KeyValue value={tempFormatted} icon="device_thermostat" description="Temperature"></KeyValue>
            <KeyValue value={humidtyFormatted} icon="water_drop" description="Humidity"></KeyValue>
        </ContentGridLayout>
    )
}