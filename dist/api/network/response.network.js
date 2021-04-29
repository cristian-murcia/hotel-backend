"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseNetWork = void 0;
class ResponseNetWork {
    constructor() { }
    response(data, status, res) {
        return res.status(status).send({
            data: data
        });
    }
}
exports.ResponseNetWork = ResponseNetWork;
//# sourceMappingURL=response.network.js.map