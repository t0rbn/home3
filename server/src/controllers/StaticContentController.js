import express from "express";
export default class StaticContentController {
    registerEndpoints(app) {
        app.use(express.static('../client/build'));
    }
}
//# sourceMappingURL=StaticContentController.js.map