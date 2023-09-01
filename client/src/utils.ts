import config from './shared/config.json'

export function resolveApi(endpoint: string, resource?: string): string {
    return `http://${config.server.host}:${config.server.port}${endpoint}${resource ? (`/${resource}`) : ``}`;
}

export function classNames(...classes: Array<string | null | undefined>): string {
    return classes.filter(fragment => fragment && `${fragment}`.length > 0).map(fragment => `${fragment}`).join(' ')
}

export function conditionalClassName(condition: boolean, className: string): string {
    return condition ? className : ''
}