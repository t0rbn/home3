import Controller from "./Controller";
import {Application} from "express";
import config from "../../../shared/config.json";
import Dht11Service from "../dht11/Dht11Service";

export default class ClimateController implements Controller {

    private dht11Service;

    constructor() {
        this.dht11Service = new Dht11Service();
    }

    registerEndpoints(app: Application): void {
        app.get(`${config.api.climate}`, async (_req, res) => {
            try {
                res.send(this.dht11Service.getData())
            } catch (e) {
                res.sendStatus(500)
            }
        })
    }

}