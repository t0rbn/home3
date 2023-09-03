import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import config from "../shared/config.json";
import {ApiClimateData} from "../../../shared/types/Climate";
import {resolveApi} from "../utils";

const ClimateContext = createContext({ data: undefined as ApiClimateData | undefined })

function ClimateContextProvider(props: PropsWithChildren) {
    const [data, setData] = useState<ApiClimateData | undefined>(undefined)

    const refreshData = async (): Promise<void> => {
        const response = await fetch(resolveApi(config.api.climate))
        setData(await response.json())
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