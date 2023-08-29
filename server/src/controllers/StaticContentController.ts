import Controller from "./Controller";
import express, {Application} from "express";

export default class StaticContentController implements Controller {
    registerEndpoints(app: Application): void {
        app.use(express.static('../client/build'))
    }

}