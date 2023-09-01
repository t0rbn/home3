import React, {useEffect, useState} from "react";
import {ApiClimateData} from "../../../shared/types/Climate";
import {useClimateContext} from "./ClimateContext";
import Box from "../globals/box/Box";
import Spinner from "../globals/spinner/Spinner";

export default function Climate() {
    const [data, setData] = useState<ApiClimateData | null>();
    const context = useClimateContext();

    useEffect(() => {
        setData(context.data);
    }, [context.data])

    if (!data) {
        return <Box><Spinner /></Box>
    }

    return (
        <Box>
            <h1>{data!.tempC} °C</h1>
            <p>{Math.round(data!.humidity * 100)} %</p>
        </Box>
    )
}