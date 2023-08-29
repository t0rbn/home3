import TradfriService from "../tradfri/TradfriService";
export default class LightsController {
    tradfriService;
    constructor() {
        this.tradfriService = new TradfriService();
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
//# sourceMappingURL=LightsController.js.map