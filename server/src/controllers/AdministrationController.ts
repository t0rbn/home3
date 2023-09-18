import Controller from "./Controller";
import AdministratoinService from "../administration/AdministrationService";
import config from "../../../shared/config.json";
import {Application} from "express";
// @ts-ignore
import {ApiAdministrationAction} from "../../../shared/types/Administration";

export default class AdministrationController implements Controller {
    private administrationService: AdministratoinService;

    constructor() {
        this.administrationService = new AdministratoinService();
    }

    registerEndpoints(app: Application): void {
        app.post(`${config.api.administration}/action`, async (req, res) => {
            const action = JSON.parse(req.body) as ApiAdministrationAction;
            if (action.type === 'restart-application') {
                res.sendStatus(200);
                await this.administrationService.restartApp();
            }

            if (action.type === 'restart-gateway') {
                await this.administrationService.restartTradfriGateWay();
                res.sendStatus(200)
            }
        })
    }
}