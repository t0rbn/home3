import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import config from "../shared/config.json";
import {ApiClimateData} from "../../../shared/types/Climate";

const ClimateContext = createContext({ data: null as (ApiClimateData | null)})

function ClimateContextProvider(props: PropsWithChildren) {
    const [data, setData] = useState<ApiClimateData | null>(null)

    const refreshData = async (): Promise<void> => {
        const response = await fetch(config.api.climate)
        setData(await response.json());
    }

    useEffect(() => {
        refreshData()
        // @ts-ignore
        setInterval(refreshData, config.climate.refreshIntervalS * 1000)
    } , [])

    return <ClimateContext.Provider value={{data}}>{props.children}</ClimateContext.Provider>
}

function useClimateContext() {
    return useContext(ClimateContext)
}

export {
    ClimateContextProvider,
    useClimateContext
}