"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../../config");
exports.AuthJwt = {
    sign: function (data) {
        return jwt.sign(data, config_1.config.jwt.secret);
    },
    verify: function (req, res, next) {
        jwt.verify(req.body.data, config_1.config.jwt.secret, (error, payload) => {
            if (error) {
                return res.status(200).send({
                    code: 1,
                    mensaje: 'Token invalido'
                });
            }
            else if (!payload.token || payload.token == "" ||
                !payload.proceso || payload.proceso == "") {
                return res.status(200).send({
                    code: 6,
                    mensaje: 'Información basica incorrecta'
                });
            }
            payload['user'] = jwt.decode(payload.token);
            req.body = payload;
            return next();
        });
    },
    decodeToken: function (token) {
        return jwt.decode(token, { json: true });
    }
};
//# sourceMappingURL=jwt.middleware.js.map