import {ApiClimateData} from "../../../shared/types/Climate";
import config from "../../../shared/config.json"
import Logger from "../utils/Logger";
import sensor from "node-dht-sensor"

export default class Dht11Service {

    private static currentData?: ApiClimateData = undefined;
    private logger;

    constructor() {
        this.logger = new Logger("Dht11Service");
    }


    private isDataExpired(): boolean {
        if (!Dht11Service.currentData?.measuredAt) {
            return true;
        }
        const now = Date.now();
        const readNeededAfter = new Date(Dht11Service.currentData.measuredAt).getTime() + (config.climate.dht11.readingTimeoutS * 1000)
        return now > readNeededAfter
    }

    private updateCurrentData(): void {
        try {
            const reading = sensor.read(11, config.climate.dht11.pin);
            Dht11Service.currentData = {
                humidity: reading.humidity + config.climate.dht11.offsets.humidity,
                tempC: reading.temperature +  config.climate.dht11.offsets.tempC,
                measuredAt: new Date().toISOString()
            }
        } catch (e: any) {
            this.logger.warn("failed to read dht11 data: " + e.message)
        }
    }

    public getData(): ApiClimateData {
        if (this.isDataExpired()) {
            this.updateCurrentData();
        }

        if (!Dht11Service.currentData) {
            throw new Error("failed to update dht1 data")
        }
        return Dht11Service.currentData;
    }

}