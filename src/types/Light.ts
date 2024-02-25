export type TradfriLight = {
    name: string
    id: string
    brightness: number
    color: string,
    readonly spectrum: 'none' | 'white' | 'rgb'
}

export type TradfriGroup = {
    id: string
    name: string,
    lights: Array<TradfriLight>
}