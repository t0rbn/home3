import TradfriService from "../tradfri/TradfriService";
export default class ScenesController {
    tradfriService;
    constructor() {
        this.tradfriService = new TradfriService();
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
//# sourceMappingURL=ScenesController.js.map