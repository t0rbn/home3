export function sanitizeColor(color: string) {
    return `#${color.replace(/#/g, '')}`;
}

export function getAverageHexColor(colors: Array<string>) {
    const acc = {r: 0, g: 0, b: 0}

    colors.forEach(c => {
        acc.r += Number.parseInt('0x' + c.slice(1, 3))
        acc.g += Number.parseInt('0x' + c.slice(3, 5))
        acc.b += Number.parseInt('0x' + c.slice(5, 7))
    })

    acc.r = Math.floor(acc.r / colors.length)
    acc.g = Math.floor(acc.g / colors.length)
    acc.b = Math.floor(acc.b / colors.length)

    return `#`
        + acc.r.toString(16).padStart(2, '0')
        + acc.g.toString(16).padStart(2, '0')
        + acc.b.toString(16).padStart(2, '0')
}