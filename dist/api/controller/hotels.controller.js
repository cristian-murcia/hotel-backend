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
exports.HotelController = void 0;
const hotel_component_1 = require("../components/hotel.component");
const coderror_enum_1 = require("../enum/coderror.enum");
const response_network_1 = require("../network/response.network");
class HotelController {
    constructor() {
        this.response = new response_network_1.ResponseNetWork();
        this.hotelComponent = new hotel_component_1.HotelComponent();
    }
    /**
     * Retorna todos los hoteles
     * @param req
     * @param res
     * @returns
     */
    getHotels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.hotelComponent.getHotels();
            return this.response.response(result, result.status, res);
        });
    }
    /**
     * Devuelve un hotel por id
     * @param req
     * @param res
     * @returns
     */
    getHotelForId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_hotel = 1; //Number(req.body.id_hotel);
            let result;
            if (id_hotel > 0) {
                result = yield this.hotelComponent.getHotelForID(id_hotel);
            }
            else {
                result = {
                    code: coderror_enum_1.Coderror.ErrorParametro,
                    mensaje: 'Error de id_hotel',
                    status: 200
                };
            }
            return this.response.response(result, result.status, res);
        });
    }
    /**
     * Creación de hotel
     * @param req
     * @param res
     * @returns
     */
    createHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let newHotell;
            let newHotel = {
                hotelName: 'Miami Bich123',
                precio: 512
            }; //req.body.datos.newHotel;
            let result;
            if (newHotel.hotelName != '' && newHotel.precio > 0) {
                newHotel.categoria = 5; //Por defecto un hotel tiene 5 estrellas
                result = yield this.hotelComponent.createHotel(newHotel);
            }
            else {
                result = {
                    code: coderror_enum_1.Coderror.ErrorParametro,
                    mensaje: 'Los parametros no son validos',
                    status: 200
                };
            }
            return this.response.response(result, result.status, res);
        });
    }
    /**
     * Actualización de hotel
     * @param req
     * @param res
     * @returns
     */
    updateHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let updateHotel = {
                hotelID: 6,
                hotelName: 'Miami Bich123 updated',
                precio: 515,
                categoria: 4
            }; //req.body.newHotel;
            let result;
            if (updateHotel.hotelName != '' && updateHotel.precio > 0 &&
                updateHotel.categoria && updateHotel.categoria >= 1 && updateHotel.categoria <= 5) {
                result = yield this.hotelComponent.updateHotel(updateHotel);
            }
            else {
                result = {
                    code: coderror_enum_1.Coderror.ErrorParametro,
                    mensaje: 'Los parametros no son validos',
                    status: 200
                };
            }
            return this.response.response(result, result.status, res);
        });
    }
    /**
     * Borrado de hotel
     * @param req
     * @param res
     */
    removeHotel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let id_hotel = 6; // req.body.datos.id_hotel
            let result;
            if (id_hotel > 0) {
                result = yield this.hotelComponent.removeHotel(id_hotel);
            }
            else {
                result = {
                    code: coderror_enum_1.Coderror.ErrorId_Pago,
                    mensaje: 'Los parametros no son validos',
                    status: 200
                };
            }
            return this.response.response(result, result.status, res);
        });
    }
}
exports.HotelController = HotelController;
//# sourceMappingURL=hotels.controller.js.map