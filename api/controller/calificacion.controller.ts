import { Request, Response } from 'express';
import { CalificacionComponent } from '../components/calificacion.component';
import { Coderror } from '../enum';
import { ICalificacion } from '../interfaces/calificacion';
import { CalificacionResponse } from '../interfaces/calificacion/calificacion.response';
import { ResponseNetWork } from '../network';
import { HotelController } from './hotels.controller';

export class CalificacionController {

    public calificacionComponent: CalificacionComponent;
    public hotelController: HotelController;
    public response: ResponseNetWork;

    constructor() {
        this.response = new ResponseNetWork();
        this.calificacionComponent = new CalificacionComponent();
        this.hotelController = new HotelController();
    }

    /**
     * Trae las calificaciones por hotel
     * @param req 
     * @param res 
     * @returns 
     */
    public async getCalificaciones(req: Request, res: Response) {
        let id_hotel: number = req.body.datos.id_hotel;
        let result: CalificacionResponse;

        if (id_hotel > 0) {
            result = await this.calificacionComponent.getCalificacionesForHotel(id_hotel);
        } else {
            result = {
                code: Coderror.ErrorId_Hotel,
                mensaje: 'El parametro no es valido',
                status: 200
            }
        }

        return this.response.response(result, result.status, res)
    }

    /**
     * Permite traer la calificacion por id de usuario y hotel
     * @param req 
     * @param res 
     * @returns 
     */
    public async getCalificacionForId(req: Request, res: Response) {
        let id_hotel: number = req.body.datos.id_hotel;
        let id_user: number = req.body.datos.id_user;
        let result: any

        if (id_hotel > 0 && id_user > 0) {
            result = await this.calificacionComponent.getCalificacionForID(id_hotel, id_user);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

    /**
     * Permite la creación de calificaciones
     * @param req 
     * @param res 
     * @returns 
     */
    public async createCalificacion(req: Request, res: Response) {
        let calificacion: ICalificacion = req.body.datos.newCalificacion
        let result: any;

        if (calificacion.comentario && calificacion.hotel_hotelID &&
            calificacion.usuario_userID && calificacion.estrellas > 0
        ) {
            result = await this.calificacionComponent.createCalificacion(calificacion);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        this.traerCalificaciones(calificacion.hotel_hotelID);

        return this.response.response(result, result.status, res);
    }

    /**
     * Permite la actualización de una calificacion
     * @param req 
     * @param res 
     * @returns 
     */
    public async updateCalificacion(req: Request, res: Response) {
        let calificacion: ICalificacion = req.body.datos.updateCalificacion
        let result: any;

        if (calificacion.idcalificacion && calificacion.idcalificacion > 0 &&
            calificacion.comentario != '' && calificacion.hotel_hotelID > 0 &&
            calificacion.usuario_userID > 0 && calificacion.estrellas > 0
        ) {
            result = await this.calificacionComponent.updateCalificacion(calificacion);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }
        this.traerCalificaciones(calificacion.hotel_hotelID);

        return this.response.response(result, result.status, res);
    }

    /**
     * Remueve la calificación por Id
     * @param req 
     * @param res 
     * @returns 
     */
    public async removeCalificacion(req: Request, res: Response) {
        let id_calificacion: number = req.body.datos.id_calificacion
        let result: any;

        if (id_calificacion > 0) {
            result = await this.calificacionComponent.removeCalificacion(id_calificacion);
        } else {
            result = {
                code: Coderror.ErrorId_Pago,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

    public async traerCalificaciones(id_hotel: number) {
        let result = await this.calificacionComponent.getCalificacionesForHotel(id_hotel);
        let totalEstrellas: number = 0;

        result.calificaciones?.forEach(cal => {
            totalEstrellas += cal.estrellas;
        });

        let estrellasTotal = totalEstrellas / Number(result.calificaciones?.length);
        await this.hotelController.updatedCategory(id_hotel, estrellasTotal);

    }


}