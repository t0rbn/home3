import config from "../config.json";
import {TradfriApiGroup, TradfriApiLight, TradfriApiScene} from "@/types/Tradfri";
import LogService from "@/services/LogService";

export class MockTradfriService {
    private static logger = new LogService('TradfriService')

    constructor() {
    }


    static async getGroups(): Promise<Array<TradfriApiGroup>> {
        const availableWhiteColors = config.tradfri.colors.white
        const availableRgbColors = config.tradfri.colors.rgb.map(c => '#' + c.map(part => (Math.floor(255 * part)).toString(16).padStart(2, '0')).join(''))

        return [
            {
                id: 1,
                name: 'First Group',
                lights: [
                    {id: 1, name: 'RGB Light 1', brightness: 0, availableRgbColors, availableWhiteColors, color: availableRgbColors[0]},
                    {id: 2, name: 'RGB Light 2', brightness: 1, availableRgbColors, availableWhiteColors, color: availableRgbColors[2]},
                    {id: 3, name: 'White Spectrum Light 1', brightness: 0, availableRgbColors: [], availableWhiteColors, color: availableWhiteColors[0]},
                    {id: 4, name: 'White Spectrum Light 2', brightness: 0.5, availableRgbColors: [], availableWhiteColors, color: availableWhiteColors[0]},
                    {id: 5, name: 'No Spectrum Light 1', brightness: 0, availableRgbColors: [], availableWhiteColors: [], color: availableWhiteColors[0]},
                    {id: 6, name: 'No Spectrum Light 1', brightness: 0.01, availableRgbColors: [], availableWhiteColors: [], color: availableWhiteColors[0]},
                ],
                plugs: [
                    {id: 1, name: 'First Plug', isOn: true},
                    {id: 2, name: 'Second Plug', isOn: false},

                ]
            }, {
                id: 2,
                name: 'Group 2',
                lights: [
                    {id: 7, name: 'RGB Light', brightness: 0, availableRgbColors, availableWhiteColors, color: availableRgbColors[0]},
                   ],
                plugs: []
            }, {
                id: 3,
                name: '3rd Group',
                lights: [],
                plugs: [
                    {id: 3, name: 'Another Plug', isOn: true},
                ]
            }
        ];
    }

    static async getScenes(): Promise<Array<TradfriApiScene>> {
        return [
            {id: 1, name: 'ALL OFF'},
            {id: 2, name: 'Default'},
            {id: 3, name: 'Work'},
            {id: 4, name: 'Movie Night'},
            {id: 5, name: 'Blinkenlights'},
            {id: 6, name: 'Goodnight'}
        ]
    }

    static async activateScene(sceneId: number): Promise<void> {
        this.logger.log(`activateScene called with id ${sceneId}`)
    }

    static async getLight(id: number): Promise<TradfriApiLight | null> {
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
