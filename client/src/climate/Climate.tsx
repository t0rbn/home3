import React, {useEffect, useState} from "react";
import {ApiClimateData} from "../../../shared/types/Climate";
import {useClimateContext} from "./ClimateContext";
import Box from "../globals/box/Box";
import SpinnerBox from "../globals/spinner/SpinnerBox";
import KeyValue from "../globals/key-value/KeyValue";
import ListLayout from "../globals/layouts/list-layout/ListLayout";
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
        <Box>
            <ListLayout space="big">
                <h1>Climate</h1>
                <ContentGridLayout space="big">
                    <KeyValue value={tempFormatted} icon="thermometer-half" description="Temperature"></KeyValue>
                    <KeyValue value={humidtyFormatted} icon="tint" description="Humidity"></KeyValue>
                </ContentGridLayout>
            </ListLayout>
        </Box>
    )
}