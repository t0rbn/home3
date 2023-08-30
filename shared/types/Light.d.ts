export type ApiLight = {
    name: string;
    id: string;
    brightness: number;
    readonly spectrum: 'none' | 'white' | 'rgb';
};
export type ApiWhiteSpectrumiLight = ApiLight & {
    whiteTemperature: number;
    readonly spectrum: 'white';
};
export type ApiRgbLight = ApiLight & {
    color: string;
    readonly spectrum: 'rgb';
};
export type ApiLightsGroup = {
    id: string;
    name: string;
    lights: Array<ApiLight>;
};
export type ApiLightAction = {
    type: 'set-brightness' | 'set-white-temperature' | 'set-color';
    lightId: string;
    value: number | string;
};
