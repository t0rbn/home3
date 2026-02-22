import config from "../config.json";


export default class Logger {

    private static maxUnitNameLength = 0
    private unitName: string

    constructor(unitName = '') {
        this.unitName = unitName
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length)
    }

    private printString(symbol: string, text: string): void {
        const msg = `${symbol} [${this.unitName.padEnd(Logger.maxUnitNameLength, ' ')}] ${text}`
        console.log(msg)
    }

    log(text: string): void {
        this.printString('→', text)
    }

    warn(text: string): void {
        this.printString('⚠️', text)
    }
}
