import Controller from "../Controller";
import config from "../../../../shared/config.json";
// @ts-ignore
import {ApiClimateData} from "../../../../shared/types/Climate";
import {Application} from "express";
import Logger from "../../utils/Logger";

export default class MockClimateController implements Controller {
    private logger: any;

    constructor() {
        this.logger = new Logger("ClimateController Mock")
    }

    registerEndpoints(app: Application) {
        this.logger.warn("Activating climate api mock endpoint")
        app.get(`${config.api.climate}`, async (_req, res) => res.send({
            tempC: 23,
            humidity: 0.42,
            measuredAt: new Date().toISOString()
        } as ApiClimateData))
    }
}