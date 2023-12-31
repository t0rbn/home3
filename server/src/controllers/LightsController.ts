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
            const action = JSON.parse(req.body) as ApiLightAction

            if (action.type === 'set-brightness') {
                await this.tradfriService.setLightBrightness(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value))
            }

            if (action.type === 'set-color') {
                await this.tradfriService.setLightColor(action.lightId, `${action.value}`)
            }

            if (action.type === 'set-white-temperature') {
                await this.tradfriService.setLightWhiteTemperature(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value))
            }

            res.sendStatus(200)
        })
    }
}
