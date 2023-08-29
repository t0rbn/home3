import Controller from "./Controller";
import {Application} from "express";
import TradfriService from "../tradfri/TradfriService";
// @ts-ignore
import {ApiSceneAction} from "../../../shared/types/Scenes";

export default class ScenesController implements Controller {
    private tradfriService;

    constructor() {
        this.tradfriService = new TradfriService()
    }


    registerEndpoints(app: Application): void {
        app.get('api/scenes', async (_req, res) => res.send(this.tradfriService.getScenes()))
        app.post('api/scenes/action', async (req, res) => {
            const action = req.body as ApiSceneAction
            if (action.type === 'trigger-scene') {
                await this.tradfriService.setScene(action.sceneId)
            }
            res.sendStatus(200)
        })
    }

}