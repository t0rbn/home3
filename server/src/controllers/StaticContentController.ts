import Controller from "./Controller";
import express, {Application} from "express";

export default class StaticContentController implements Controller {
    async registerEndpoints(app: Application): Promise<void> {
        app.use(express.static('../../client/build/'))
    }
}