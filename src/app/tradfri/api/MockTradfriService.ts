import config from "../../../config.json";
import {TradfriApiGroup, TradfriApiLight, TradfriApiScene} from "@/types/Tradfri";
import Logger from "@/utils/Logger";

export class MockTradfriService {
    private static logger = new Logger('TradfriService')

    constructor() {
        MockTradfriService.logger.log('MockTradfriService initialized')
    }

    private static getRandomNumericalId() {
        return Math.floor(Math.random() * 999999)
    }


    static async getGroups(): Promise<Array<TradfriApiGroup>> {
        const availableWhiteColors = config.tradfri.colors.white
        const availableRgbColors = config.tradfri.colors.rgb.map(c => '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join(''))
        this.logger.log(`getGroups() called`)
        return [
            {
                id: MockTradfriService.getRandomNumericalId(),
                name: 'First Group',
                lights: [
                    {id: MockTradfriService.getRandomNumericalId(), name: 'RGB Light 1', brightness: 0, availableRgbColors, availableWhiteColors, color: availableRgbColors[0]},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'RGB Light 2', brightness: 1, availableRgbColors, availableWhiteColors, color: availableRgbColors[6]},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'White Spectrum Light 1', brightness: 0, availableRgbColors: [], availableWhiteColors, color: availableWhiteColors[0]},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'White Spectrum Light 2', brightness: 0.5, availableRgbColors: [], availableWhiteColors, color: availableWhiteColors[0]},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'No Spectrum Light 1', brightness: 0, availableRgbColors: [], availableWhiteColors: [], color: availableWhiteColors[0]},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'No Spectrum Light 1', brightness: 0.01, availableRgbColors: [], availableWhiteColors: [], color: availableWhiteColors[0]},
                ],
                plugs: [
                    {id: MockTradfriService.getRandomNumericalId(), name: 'First Plug', isOn: true},
                    {id: MockTradfriService.getRandomNumericalId(), name: 'Second Plug', isOn: false},

                ]
            }, {
                id: MockTradfriService.getRandomNumericalId(),
                name: 'Group 2',
                lights: [
                    {id: MockTradfriService.getRandomNumericalId(), name: 'RGB Light', brightness: 0, availableRgbColors, availableWhiteColors, color: availableRgbColors[3]},
                ],
                plugs: []
            }, {
                id: MockTradfriService.getRandomNumericalId(),
                name: '3rd Group',
                lights: [],
                plugs: [
                    {id: MockTradfriService.getRandomNumericalId(), name: 'Another Plug', isOn: true},
                ]
            }
        ];
    }

    static async getScenes(): Promise<Array<TradfriApiScene>> {
        this.logger.log(`getScenes() called`)
        return [
            {id: MockTradfriService.getRandomNumericalId(), name: 'All off'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Default'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Work'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Movie Night'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Lonsch'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Puff'},
            {id: MockTradfriService.getRandomNumericalId(), name: 'Fortnite'}
        ]
    }

    static async activateScene(sceneId: number): Promise<void> {
        this.logger.log(`activateScene called with id ${sceneId}`)
    }

    static async getLight(id: number): Promise<TradfriApiLight | null> {
        this.logger.log(`getLight called with id ${id}`)
        return (await this.getGroups()).flatMap(g => g.lights).find(l => l.id === id) ?? null
    }

    static async setLightBrightness(lightId: number, newBrightness: number): Promise<void> {
        this.logger.log(`setLightBrightness called with id ${lightId} -> ${newBrightness}`)
    }

    static async setLightColor(lightId: number, newColor: string): Promise<void> {
        this.logger.log(`setLightColor called with id ${lightId} -> ${newColor}`)
    }

    static async togglePlug(plugId: number): Promise<void> {
        this.logger.log(`togglePlug called with id ${plugId}`)
    }
}
