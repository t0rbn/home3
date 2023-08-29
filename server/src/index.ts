import express from "express"
import bodyParser from "body-parser";
import cors from "cors";
import Controller from './controllers/Controller';
import ScenesController from "./controllers/ScenesController";
import LightsController from "./controllers/LightsController";
import Logger from "./utils/Logger";
import config from '../../shared/config.json'
import StaticContentController from "./controllers/StaticContentController";

const controllers: Controller[] = [
    new LightsController(),
    new ScenesController(),
    new StaticContentController()
]

function start() {
    const logger = new Logger("App")
    const app = express()
    app.use(bodyParser.text())
    app.use(cors())
    // @ts-ignore
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store')
        next()
    })

    logger.log("registering API endpoints")
    controllers.forEach(c => c.registerEndpoints(app))
    app._router.stack.forEach((layer: any) => {
        if (layer.route?.path) {
            logger.log(`mapped path ${layer.route.path}`)
        }
    })

    const port = config.server.port
    app.listen(port, () => logger.log(`Started on port ${port}`))
}

start();
