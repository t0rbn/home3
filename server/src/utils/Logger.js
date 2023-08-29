"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    static maxUnitNameLength = 0;
    unitName;
    constructor(unitName = '') {
        this.unitName = unitName;
        Logger.maxUnitNameLength = Math.max(Logger.maxUnitNameLength, unitName.length);
    }
    printString(symbol, text) {
        console.log(`${symbol} | ${new Date().toLocaleTimeString()} | ${this.unitName.padEnd(Logger.maxUnitNameLength, ' ')} | ${text}`);
    }
    log(text) {
        this.printString(' ', text);
    }
    alert(text) {
        this.printString('!', `\x1b[31m${text}\x1b[0m`);
    }
}
exports.default = Logger;
//# sourceMappingURL=Logger.js.map