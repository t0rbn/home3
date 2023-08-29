import Controller from "./Controller";
import { Application } from "express";
export default class StaticContentController implements Controller {
    registerEndpoints(app: Application): void;
}
