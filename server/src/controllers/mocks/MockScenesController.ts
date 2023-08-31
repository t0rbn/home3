import Controller from "../Controller";
import {Application} from "express";
import config from "../../../../shared/config.json";
import {ApiScene} from "../../../../shared/types/Scenes";
import Logger from "../../utils/Logger";

export default class MockScenesController implements Controller {
    private logger: any;

    constructor() {
        this.logger = new Logger("ScenesController Mock")
    }

    registerEndpoints(app: Application): void {
        this.logger.warn("Activating scenes api mock endpoint")

        app.get(`${config.api.scenes}`, async (_req, res) => res.send([
            {id: 'id-1', name: 'Scene 1',} as ApiScene,
            {id: 'id-2', name: 'Another Scene',} as ApiScene,
            {id: 'id-3', name: 'Third Scene',} as ApiScene,
            {id: 'id-4', name: 'Scene IV (Roman Numeral)',} as ApiScene
        ]))

        app.post(`${config.api.scenes}/action`, async (req, res) => {
            this.logger.log("Receiverd Action " + req.body)
            await new Promise(r => setTimeout(r, config.tradfri.actionResponseWaitTimeMs)) // wait for action to be applied in gateway
            res.sendStatus(200)
        })
    }
}
