export function sanitizeColor(color: string) {
  return `#${color.replace(/#/g, '')}`;
}