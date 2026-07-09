type TradfriEntity = {
    readonly id: number,
    readonly name: string,
}

export type TradfriLight = TradfriEntity & {
    readonly brightness: number,
    readonly color: string,
    readonly spectrum: 'none' | 'white' | 'rgb'
    readonly type: 'light'
}

export type TradfriPlug = TradfriEntity & {
    readonly isOn: boolean
    readonly type: 'plug'
}

export type TradfriDevice = TradfriLight | TradfriPlug

export type TradfriScene = TradfriEntity & {
}

export type TradfriGroup = TradfriEntity & {
    devices: Array<TradfriDevice>
}
