"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class StaticContentController {
    registerEndpoints(app) {
        app.use(express_1.default.static('../client/build'));
    }
}
exports.default = StaticContentController;
//# sourceMappingURL=StaticContentController.js.map