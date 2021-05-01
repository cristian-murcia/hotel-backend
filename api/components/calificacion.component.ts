import { ValidationError } from "sequelize";
import { values } from "sequelize/types/lib/operators";
import { Coderror } from "../enum/coderror.enum";
import { ICalificacion } from "../interfaces/calificacion";
import { CalificacionResponse } from "../interfaces/calificacion/calificacion.response";
import { Calificacion } from "../models/calificacion.model";
import { Hotel } from '../models/hotel.model';
import { Usuario } from "../models/usuario.model";

export class CalificacionComponent {

    constructor() { }

    /**
     * Retorna todas la calificaciones de un hotel
     * @param id_hotel
     * @returns 
     */
    public async getCalificacionesForHotel(id_hotel: number): Promise<CalificacionResponse> {
        try {
            return await Calificacion.findAll(
                {
                    where: {
                        hotel_hotelID: id_hotel
                    },
                    nest: true,
                    include: [{
                        model: Usuario,
                        attributes: [['userName', 'nombre'], ['userSurname', 'apellido']],
                    }],

                    raw: true,
                }
            ).then(result => {
                return {
                    code: 0,
                    mensaje: 'Exitoso',
                    status: 200,
                    calificaciones: result
                } as CalificacionResponse;

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as CalificacionResponse;
            });

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as CalificacionResponse;
        }
    }

    /**
     * Retorna una calificacion por Id de usuario y hotel
     * @param id_hotel
     * @param id_user 
     * @returns 
     */
    public async getCalificacionForID(id_hotel: number, id_user: number): Promise<CalificacionResponse> {
        try {
            return await Calificacion.findOne(
                {
                    where: {
                        hotel_hotelID: id_hotel,
                        usuario_userID: id_user
                    }
                }
            ).then(result => {
                if (result) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Exitoso',
                        status: 200,
                        calificacion: result
                    } as CalificacionResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No se encontro ningun hotel',
                        status: 200
                    } as CalificacionResponse;
                }

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as CalificacionResponse;
            });
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as CalificacionResponse;
        }
    }

    /**
     * Permite crear una nueva calificación
     * @param data 
     * @returns 
     */
    public async createCalificacion(data: ICalificacion): Promise<CalificacionResponse> {
        try {
            return await Calificacion.create({ ...data }, { raw: true })
                .then(result => {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Calificación creada con exito',
                        status: 200,
                        calificacion: result
                    } as CalificacionResponse;


                }).catch((error: ValidationError) => {
                    return {
                        code: Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    } as CalificacionResponse;
                })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as CalificacionResponse;
        }
    }

    /**
     * Actualizar los datos de una calificación
     * @param data 
     * @returns 
     */
    public async updateCalificacion(data: ICalificacion): Promise<CalificacionResponse> {
        try {
            return await Calificacion.update(
                data,
                {
                    where: {
                        idcalificacion: data.idcalificacion
                    },
                }
            ).then(result => {
                if (result[0] == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Calificación actualizada con exito',
                        status: 200,
                        calificacions: result[1]
                    } as CalificacionResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe la calificación',
                        status: 200
                    } as CalificacionResponse;
                }

            }).catch((error: ValidationError) => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 200,
                    body: error
                } as CalificacionResponse;
            })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as CalificacionResponse;
        }
    }

    /**
     * Remueve una calificación
     * @param id_calificacion 
     * @returns 
     */
    public async removeCalificacion(id_calificacion: number): Promise<CalificacionResponse> {
        try {
            return await Calificacion.destroy({
                where: {
                    idcalificacion: id_calificacion
                }
            }).then(result => {
                if (result == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Se ha eliminado con exito la calificación',
                        status: 200,
                    } as CalificacionResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe la calificación',
                        status: 200
                    } as CalificacionResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as CalificacionResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as CalificacionResponse;
        }

    }
}