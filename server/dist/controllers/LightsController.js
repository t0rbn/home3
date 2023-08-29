"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TradfriService_1 = __importDefault(require("../tradfri/TradfriService"));
class LightsController {
    constructor() {
        this.tradfriService = new TradfriService_1.default();
    }
    registerEndpoints(app) {
        app.get('api/lights/groups', async (_req, res) => res.send(this.tradfriService.getGroups()));
        app.post('api/lights/action', async (req, res) => {
            const action = req.body;
            if (action.type === 'set-brightness') {
                await this.tradfriService.setLightBrightness(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value));
            }
            if (action.type === 'set-color') {
                await this.tradfriService.setLightColor(action.lightId, `${action.value}`);
            }
            if (action.type === 'set-white-temperature') {
                await this.tradfriService.setLightWhiteTemperature(action.lightId, typeof action.value === 'number' ? action.value : Number.parseFloat(action.value));
            }
            res.sendStatus(200);
        });
    }
}
exports.default = LightsController;
//# sourceMappingURL=LightsController.js.map