import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import StaticContentController from "./controllers/StaticContentController";
const controllers = [
    new StaticContentController()
];
function start() {
    const app = express();
    app.use(bodyParser.text());
    app.use(cors());
    // @ts-ignore
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    controllers.forEach(c => c.registerEndpoints(app));
    app._router.stack.forEach((layer) => {
        if (layer.route?.path) {
            console.log(`registered path ${layer.route.path}`);
        }
    });
    app.listen(4321, () => console.log('running'));
}
start();
