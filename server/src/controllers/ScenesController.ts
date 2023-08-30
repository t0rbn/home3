import Controller from "./Controller";
import {Application} from "express";
import TradfriService from "../tradfri/TradfriService";
// @ts-ignore
import {ApiSceneAction} from "../../../shared/types/Scenes";
import config from '../../../shared/config.json'

export default class ScenesController implements Controller {
    private tradfriService;

    constructor() {
        this.tradfriService = new TradfriService()
    }

    registerEndpoints(app: Application): void {
        app.get(`${config.api.scenes}`, async (_req, res) => res.send(this.tradfriService.getScenes()))
        app.post(`${config.api.scenes}/action`, async (req, res) => {
            const action = JSON.parse(req.body) as ApiSceneAction

            if (action.type === 'trigger-scene') {
                await this.tradfriService.setScene(action.sceneId)
            }

            res.sendStatus(200)
        })
    }

}