import Controller from "../Controller";
import Logger from "../../utils/Logger";
import config from "../../../../shared/config.json"
import {Application} from "express";
import {ApiLight, ApiLightsGroup, ApiRgbLight, ApiWhiteSpectrumiLight} from "../../../../shared/types/Light";

export default class MockLightsController implements Controller {
    private logger: any;

    constructor() {
        this.logger = new Logger("LightsController Mock")
    }

    registerEndpoints(app: Application): void {
        this.logger.warn("Activating lights api mock endpoint")
        app.get(`${config.api.lights}/groups`, async (_req, res) => res.send([
            {
                id: 'id-1',
                name: 'Group one',
                lights: [
                    {
                        id: 'id-1',
                        name: 'Single Color Bulb',
                        spectrum: 'none',
                        brightness: 0,
                    } as ApiLight,
                    {
                        id: 'id-2',
                        name: 'White Spectrum  Bulb',
                        spectrum: 'white',
                        brightness: 0.5,
                        whiteTemperature: 0.23,
                    } as ApiWhiteSpectrumiLight,
                    {
                        id: 'id-3',
                        name: 'RGB Bulb',
                        spectrum: 'rgb',
                        color: '#00ff42',
                        brightness: 1,
                    } as ApiRgbLight
                ]
            } as ApiLightsGroup,
            {
                id: 'id-2',
                name: 'Another Group',
                lights: [
                    {
                        id: 'id-1',
                        name: 'Single Color Bulb',
                        spectrum: 'none',
                        brightness: .4,
                    } as ApiLight,
                    {
                        id: 'id-2',
                        name: 'White Spectrum  Bulb',
                        spectrum: 'white',
                        brightness: 0,
                        whiteTemperature: 0.23,
                    } as ApiWhiteSpectrumiLight,
                    {
                        id: 'id-3',
                        name: 'RGB Bulb',
                        spectrum: 'rgb',
                        color: '#00ff42',
                        brightness: 0,
                    } as ApiRgbLight
                ]
            } as ApiLightsGroup
        ]))
        app.post(`${config.api.lights}/action`, async (req, res) => {
            this.logger.log("Receiverd Action " + req.body)
            await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
            res.sendStatus(200)
        })
    }
}