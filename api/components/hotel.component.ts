import { ValidationError } from "sequelize";
import { Coderror } from "../enum/coderror.enum";
import { IHotel } from "../interfaces/hotel";
import { HotelResponse } from "../interfaces/hotel/hotel.response";
import { Image } from "../models";
import { Hotel } from '../models/hotel.model';

export class HotelComponent {

    constructor() { }

    /**
     * Trae todos los hoteles registrados
     * @returns 
     */
    public async getHotels(): Promise<HotelResponse> {
        try {
            return await Hotel.findAll(
                {
                    raw: true
                }
            ).then(result => {
                return {
                    code: 0,
                    mensaje: 'Exitoso',
                    status: 200,
                    hotels: result
                } as HotelResponse;

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as HotelResponse;
            });

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /**
     * Trae todos los hoteles ordenados segun su campo
     * @returns 
     */
    public async getHotelsOrder(column: string, order: string): Promise<HotelResponse> {
        try {
            return await Hotel.findAll(
                {
                    order: [[`${column}`, order]],
                    raw: true
                }
            ).then(result => {
                return {
                    code: 0,
                    mensaje: 'Exitoso',
                    status: 200,
                    hotels: result
                } as HotelResponse;

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as HotelResponse;
            });

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /***
     * Filtrar los  hoteles por categoria
     * @param categoria
     */
    public async getHotelForStar(categoria: number): Promise<HotelResponse> {
        try {
            return await Hotel.findAll(
                {
                    where: {
                        categoria: categoria
                    },
                    raw: true
                }
            ).then(result => {
                return {
                    code: 0,
                    mensaje: 'Exitoso',
                    status: 200,
                    hotels: result
                } as HotelResponse;

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as HotelResponse;
            });

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /**
     * Trae un hotel por su id
     * @param id_hotel 
     * @returns 
     */
    public async getHotelForID(id_hotel: number): Promise<HotelResponse> {
        try {
            return await Hotel.findByPk(
                id_hotel, { raw: true }
            ).then(result => {
                if (result) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Exitoso',
                        status: 200,
                        hotel: result,
                    } as HotelResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No se encontro ningun hotel',
                        status: 200
                    } as HotelResponse;
                }

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as HotelResponse;
            });
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /**
     * Crea un nuevo hotel
     * @param data 
     * @returns 
     */
    public async createHotel(data: IHotel): Promise<HotelResponse> {
        try {
            return await Hotel.create({ ...data }, { raw: true })
                .then(result => {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Hotel creado con exito',
                        status: 200
                    } as HotelResponse;


                }).catch((error: ValidationError) => {
                    return {
                        code: Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    } as HotelResponse;
                })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /**
     * Actualizar datos de un hotel 
     * @param data 
     * @returns 
     */
    public async updateHotel(data: IHotel): Promise<HotelResponse> {
        try {
            return await Hotel.update(
                data,
                {
                    where: {
                        hotelID: data.hotelID
                    }
                }
            ).then(result => {

                if (result[0] == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Hotel actualizado con exito',
                        status: 200,
                        hotels: result[1]
                    } as HotelResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe el hotel',
                        status: 200
                    } as HotelResponse;
                }

            }).catch((error: ValidationError) => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 200,
                    body: error.message
                } as HotelResponse;
            })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

    /**
     * Remover hotel
     * @param id_hotel 
     * @returns 
     */
    public async removeHotel(id_hotel: number): Promise<HotelResponse> {
        try {
            return await Hotel.destroy({
                where: {
                    hotelID: id_hotel
                }
            }).then(result => {
                if (result == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Se ha eliminado con exito',
                        status: 200,
                    } as HotelResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe el hotel',
                        status: 200
                    } as HotelResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as HotelResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }

    }

    public async updateCategory(id_hotel: number, category: number): Promise<HotelResponse> {
        try {
            return await Hotel.update(
                {
                    categoria: category
                },
                {
                    where: {
                        hotelID: id_hotel
                    }
                }
            ).then(result => {
                if (result[0] == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Se ha eliminado con exito',
                        status: 200,
                        hotels: result[1]
                    } as HotelResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe el hotel',
                        status: 200,
                    } as HotelResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as HotelResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as HotelResponse;
        }
    }

}