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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeController = void 0;
const process_enum_1 = require("../enum/process.enum");
const middleware_1 = require("../middleware");
const response_network_1 = require("../network/response.network");
const hotels_controller_1 = require("./hotels.controller");
class HomeController {
    constructor() {
        this.responseNetwork = new response_network_1.ResponseNetWork();
    }
    encode(req, res) {
        return res.json({
            token: middleware_1.AuthJwt.sign(req.body),
        });
    }
    envio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let hotelController = new hotels_controller_1.HotelController();
            let proceso = 105; //req.body.proceso
            switch (proceso) {
                case process_enum_1.Process.getHotels:
                    yield hotelController.getHotels(req, res);
                    break;
                case process_enum_1.Process.getHotelForId:
                    yield hotelController.getHotelForId(req, res);
                    break;
                case process_enum_1.Process.createHotel:
                    yield hotelController.createHotel(req, res);
                    break;
                case process_enum_1.Process.updatedHotel:
                    yield hotelController.updateHotel(req, res);
                    break;
                case process_enum_1.Process.removeHotel:
                    yield hotelController.removeHotel(req, res);
                    break;
            }
        });
    }
    decode(req, res) {
        return res.json({
            token: middleware_1.AuthJwt.decodeToken(req.body),
        });
    }
}
exports.HomeController = HomeController;
//# sourceMappingURL=home.controller.js.map