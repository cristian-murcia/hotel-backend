"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//Ruotes
const index_1 = __importDefault(require("./routes/index"));
const connection_1 = require("./database/config/connection");
class App {
    constructor(port) {
        this.port = port;
        this.app = express_1.default();
        this.setting();
        this.middleware();
        this.routes();
    }
    setting() {
        this.app.set('port', this.port);
    }
    middleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api', index_1.default);
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Api corriendo en el puerto ', this.app.get('port'));
            connection_1.database.connection();
        });
    }
}
exports.App = App;
//# sourceMappingURL=app.js.map