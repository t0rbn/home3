import config from "../config.json"

export function apiUrl(path:string) {
    const foo = path.replaceAll(/\/+/gi, '/')
    return `${config.api.base}${foo}`
}
