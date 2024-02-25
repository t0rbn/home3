export default class LogService {

    private static maxUnitNameLength = 0
    private unitName: string

    constructor(unitName = '') {
        this.unitName = unitName
        LogService.maxUnitNameLength = Math.max(LogService.maxUnitNameLength, unitName.length)
    }

    private printString(symbol: string, text: string): void {
        console.log(`${symbol} | ${new Date().toLocaleTimeString()} | ${this.unitName.padEnd(LogService.maxUnitNameLength, ' ')} | ${text}`)
    }

    log(text: string): void {
        this.printString(' ', text)
    }

    warn(text: string): void {
        this.printString('!', `\x1b[31m${text}\x1b[0m`)
    }
}
