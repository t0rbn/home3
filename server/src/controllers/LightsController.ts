import Controller from "./Controller";
import {Application} from "express";
// @ts-ignore
import config from '../../../shared/config.json'
import TradfriService from "../tradfri/TradfriService";
// @ts-ignore
import {ApiLightAction} from "../../../shared/types/Light";

export default class LightsController implements Controller {
    private tradfriService;

    constructor() {
        this.tradfriService = new TradfriService();
    }

     registerEndpoints(app: Application): void {
        app.get(`${config.api.lights}/groups`, async (_req, res) => res.send(this.tradfriService.getGroups()))
        app.post(`${config.api.lights}/action`, async (req, res) => {
            const action = req.body as ApiLightAction

            if (action.type === 'set-brightness') {
                await this.tradfriService.setLightBrightness(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value))
            }

            if (action.type === 'set-color') {
                await this.tradfriService.setLightColor(action.lightId, `${action.value}`)
            }

            if (action.type === 'set-white-temperature') {
                await this.tradfriService.setLightWhiteTemperature(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value))
            }

            await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
            res.sendStatus(200)
        })
    }
}
