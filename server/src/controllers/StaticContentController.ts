import Controller from "./Controller";
import express, {Application} from "express";
import path from "path";
import Logger from "../utils/Logger";

export default class StaticContentController implements Controller {
    private logger

    constructor() {
        this.logger = new Logger("StaticContentController")
    }

    async registerEndpoints(app: Application): Promise<void> {
        const clientPath = path.join(__dirname, '../../../client/build')
        this.logger.log("Serving static content from " + clientPath)
        app.use(express.static(clientPath))
        app.get('*', (_req, res) => res.redirect('/'))
    }
}