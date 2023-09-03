import React, {useEffect, useState} from "react";
import {ApiClimateData} from "../../../shared/types/Climate";
import {useClimateContext} from "./ClimateContext";
import Box from "../globals/box/Box";
import Spinner from "../globals/spinner/Spinner";
import styles from './climate.module.css'

export default function Climate() {
    const [data, setData] = useState<ApiClimateData | null>();
    const context = useClimateContext();

    useEffect(() => {
        setData(context.data);
    }, [context.data])

    if (!data) {
        return <Box><Spinner/></Box>
    }

    return (
        <Box>
            <div className={styles.climate}>
                <section>
                    <h1>{data!.tempC} °C</h1>
                    <p>Temperature</p>
                </section>
                <div className={styles.divider}></div>
                <section>
                    <h1>{Math.round(data!.humidity * 100)} %</h1>
                    <p>Humidity</p>
                </section>
            </div>
        </Box>
)
}