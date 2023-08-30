import Controller from "./Controller";
import express, {Application} from "express";

export default class StaticContentController implements Controller {
    async registerEndpoints(app: Application): Promise<void> {
        const clientPath = '../../client/build/'
        app.use(express.static(clientPath));
    }
}