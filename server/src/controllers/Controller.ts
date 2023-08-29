import {Application} from "express";

export default interface Controller {
    registerEndpoints(app: Application): void
}