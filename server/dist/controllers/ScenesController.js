"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TradfriService_1 = __importDefault(require("../tradfri/TradfriService"));
class ScenesController {
    constructor() {
        this.tradfriService = new TradfriService_1.default();
    }
    registerEndpoints(app) {
        app.get('api/scenes', async (_req, res) => res.send(this.tradfriService.getScenes()));
        app.post('api/scenes/action', async (req, res) => {
            const action = req.body;
            if (action.type === 'trigger-scene') {
                await this.tradfriService.setScene(action.sceneId);
            }
            res.sendStatus(200);
        });
    }
}
exports.default = ScenesController;
//# sourceMappingURL=ScenesController.js.map