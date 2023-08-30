import Controller from "./Controller";
import express, {Application} from "express";

export default class StaticContentController implements Controller {
    async registerEndpoints(app: Application): Promise<void> {
        const clientPath = '../../client/build/'

        app.use('/_next', express.static(clientPath + '/_next'));
        app.get('*', function(req, res) {
            res.sendFile('index.html', {root: clientPath});
        });
    }
}