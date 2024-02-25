export function cns(...classes: Array<string | null | undefined>): string {
    return classes.filter(fragment => fragment && `${fragment}`.length > 0).map(fragment => `${fragment}`).join(' ')
}