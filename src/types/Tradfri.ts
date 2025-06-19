export type TradfriLight = {
    readonly name: string
    readonly id: number
    readonly brightness: number
    readonly color: string,
    readonly spectrum: 'none' | 'white' | 'rgb'
    setColor?: (color: string) => Promise<void>
    setBrightness?: (brightness: number) => Promise<void>
}
export type TradfriApiLight = Omit<TradfriLight, 'setColor' | 'setBrightness' | 'spectrum'> & {
    availableWhiteColors?: Array<string>
    availableRgbColors?: Array<string>
}


export type TradfriPlug = {
    name: string
    id: number
    isOn: boolean
    toggle?: () => Promise<void>
}
export type TradfriApiPlug = Omit<TradfriPlug, 'toggle'> & {}


export type TradfriGroup = {
    id: number
    name: string,
    lights: Array<TradfriLight>
    plugs: Array<TradfriPlug>
}
export type TradfriApiGroup = Omit<TradfriGroup, 'lights' | 'plugs'> & {
    lights: Array<TradfriApiLight>,
    plugs: Array<TradfriApiPlug>,
}


export type TradfriScene = {
    name: string,
    id: number
    activate?: () => Promise<void>
}
export type TradfriApiScene = Omit<TradfriScene, 'activate'> & {}
