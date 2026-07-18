export function cns(...classes: Array<string | null | undefined | Array<string | boolean>>): string {
    return classes.map(c => {
        if (!c) {
            return null
        }
        if (Array.isArray(c)) {
            if (c.length !== 2 || typeof c[0] !== 'string' || typeof c[1] !== "boolean") {
                throw Error('unexpected array syntax usage')
            }
            return c[1] ? c[0] : null
        }
        return c
    }).filter(Boolean).join(' ')
}