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
exports.HotelComponent = void 0;
const coderror_enum_1 = require("../enum/coderror.enum");
const hotel_model_1 = require("../models/hotel.model");
class HotelComponent {
    constructor() { }
    /**
     * Trae todos los hoteles registrados
     * @returns
     */
    getHotels() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield hotel_model_1.Hotel.findAll({ raw: true }).then(result => {
                    return {
                        code: 0,
                        mensaje: 'Exitoso',
                        status: 200,
                        hotels: result
                    };
                }).catch(error => {
                    return {
                        code: coderror_enum_1.Coderror.ErrorDatabase,
                        mensaje: 'Error database',
                        status: 500,
                        body: error
                    };
                });
            }
            catch (error) {
                return {
                    code: coderror_enum_1.Coderror.ErrorServer,
                    mensaje: 'Error Internal Server',
                    status: 500,
                    body: error
                };
            }
        });
    }
    /**
     * Trae un hotel por su id
     * @param id_hotel
     * @returns
     */
    getHotelForID(id_hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield hotel_model_1.Hotel.findByPk(id_hotel).then(result => {
                    if (result) {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'Exitoso',
                            status: 200,
                            hotel: result
                        };
                    }
                    else {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'No se encontro ningun hotel',
                            status: 200
                        };
                    }
                }).catch(error => {
                    return {
                        code: coderror_enum_1.Coderror.ErrorDatabase,
                        mensaje: 'Error database',
                        status: 500,
                        body: error
                    };
                });
            }
            catch (error) {
                return {
                    code: coderror_enum_1.Coderror.ErrorServer,
                    mensaje: 'Error Internal Server',
                    status: 500,
                    body: error
                };
            }
        });
    }
    /**
     * Crea un nuevo hotel
     * @param data
     * @returns
     */
    createHotel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield hotel_model_1.Hotel.create(Object.assign({}, data), { raw: true })
                    .then(result => {
                    return {
                        code: coderror_enum_1.Coderror.Exitoso,
                        mensaje: 'Hotel creado con exito',
                        status: 200
                    };
                }).catch((error) => {
                    return {
                        code: coderror_enum_1.Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    };
                });
            }
            catch (error) {
                return {
                    code: coderror_enum_1.Coderror.ErrorServer,
                    mensaje: 'Error Internal Server',
                    status: 500,
                    body: error
                };
            }
        });
    }
    /**
     * Actualizar datos de un hotel
     * @param data
     * @returns
     */
    updateHotel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield hotel_model_1.Hotel.update(data, {
                    where: {
                        hotelID: data.hotelID
                    }
                }).then(result => {
                    console.log(typeof result, result[0]);
                    if (result[0] == 1) {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'Hotel actualizado con exito',
                            status: 200,
                            hotel: result[1]
                        };
                    }
                    else {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'No existe el hotel',
                            status: 200
                        };
                    }
                }).catch((error) => {
                    return {
                        code: coderror_enum_1.Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    };
                });
            }
            catch (error) {
                return {
                    code: coderror_enum_1.Coderror.ErrorServer,
                    mensaje: 'Error Internal Server',
                    status: 500,
                    body: error
                };
            }
        });
    }
    /**
     * Remover hotel
     * @param id_hotel
     * @returns
     */
    removeHotel(id_hotel) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield hotel_model_1.Hotel.destroy({
                    where: {
                        hotelID: id_hotel
                    }
                }).then(result => {
                    console.log(result);
                    if (result == 1) {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'Se ha eliminado con exito',
                            status: 200,
                        };
                    }
                    else {
                        return {
                            code: coderror_enum_1.Coderror.Exitoso,
                            mensaje: 'No existe el hotel',
                            status: 200
                        };
                    }
                }).catch(error => {
                    return {
                        code: coderror_enum_1.Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 500,
                        body: error
                    };
                });
            }
            catch (error) {
                return {
                    code: coderror_enum_1.Coderror.ErrorServer,
                    mensaje: 'Error Internal Server',
                    status: 500,
                    body: error
                };
            }
        });
    }
}
exports.HotelComponent = HotelComponent;
//# sourceMappingURL=hotel.component.js.map