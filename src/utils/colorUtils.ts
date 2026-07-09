export function sanitizeColor(color: string) {
    return `#${color.replace(/#/g, '')}`;
}

export function rgbArrayToHex(rgb: number[]) {
    return `#${rgb.map((v) => Math.floor(255 * v).toString(16).padStart(2, '0')).join('')}`;
}