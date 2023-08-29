"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const StaticContentController_1 = __importDefault(require("./controllers/StaticContentController"));
const controllers = [
    new StaticContentController_1.default()
];
function start() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.text());
    app.use((0, cors_1.default)());
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
//# sourceMappingURL=index.js.map