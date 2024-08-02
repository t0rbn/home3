export type TradfriLight = {
    name: string
    id: number
    brightness: number
    color: string,
    readonly spectrum: 'none' | 'white' | 'rgb'
    setColor?: (color: string) => Promise<void>
    setBrightness?: (brightness: number) => Promise<void>
}

export type TradfriPlug = {
    name: string
    id: number
    isOn: boolean
    toggle?: () => Promise<void>
}

export type TradfriGroup = {
    id: number
    name: string,
    lights: Array<TradfriLight>
    plugs: Array<TradfriPlug>
}

export type TradfriScene = {
    name: string,
    id: number
    activate?: () => Promise<void>
}