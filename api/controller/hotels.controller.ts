import { Request, Response } from 'express';
import { HotelComponent } from '../components/hotel.component';
import { ImageComponent } from '../components/image.component';
import { Coderror } from '../enum';
import { HotelResponse, IHotel } from '../interfaces/hotel';
import { ResponseNetWork } from '../network';

export class HotelController {

    public hotelComponent: HotelComponent;
    public ImageComponent: ImageComponent;
    public response: ResponseNetWork;

    constructor() {
        this.response = new ResponseNetWork();
        this.hotelComponent = new HotelComponent();
        this.ImageComponent = new ImageComponent();
    }

    /**
     * Retorna todos los hoteles
     * @param req 
     * @param res 
     * @returns 
     */
    public async getHotels(req: Request, res: Response) {
        let result = await this.hotelComponent.getHotels();
        let hotels = result.hotels || [];
        if (hotels?.length >= 0) {
            result.hotels = await this.addImageHotel(hotels)
        }

        return this.response.response(result, result.status, res)
    }

    /**
     * Devuelve un hotel por id
     * @param req 
     * @param res 
     * @returns 
     */
    public async getHotelForId(req: Request, res: Response) {
        let id_hotel: number = Number(req.body.datos.id_hotel);
        let result;
        if (id_hotel > 0) {
            result = await this.hotelComponent.getHotelForID(id_hotel);

            if (result.hotel) {
                let hot = [{ ...result.hotel }]
                result.hotels = await this.addImageHotel(hot)
                delete result.hotel;
            }
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Error de id_hotel',
                status: 200
            }
        }
        return this.response.response(result, result.status, res);
    }

    /**
     * Ordenar hoteles segun su campo en desc o asc
     * @param req 
     * @param res 
     * @returns 
     */
    public async gethotelOrder(req: Request, res: Response) {
        let formOrder = req.body.datos.formaOrder;
        let campo = req.body.datos.campo;
        let result: any;

        if (formOrder != '' && campo != '') {
            result = await this.hotelComponent.getHotelsOrder(campo, formOrder);

            let hotels = result.hotels || [];
            if (hotels?.length >= 0) {
                result.hotels = await this.addImageHotel(hotels)
            }
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Error en los parametros',
                status: '200'
            }
        }

        return this.response.response(result, result.status, res);
    }

    /***
     * Retornar una lista de hoteles por su categoria (estrellas)
     */
    public async getHotelForStart(req: Request, res: Response) {
        let estrellas: number = Number(req.body.datos.estrellas);
        let result: any;

        if (estrellas > 0) {
            result = await this.hotelComponent.getHotelForStar(estrellas);

            let hotels = result.hotels || [];
            if (hotels?.length >= 0) {
                result.hotels = await this.addImageHotel(hotels)
            }
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Error en el parametro estrella',
                status: '200'
            }
        }

        return this.response.response(result, result.status, res);
    }

    /**
     * Agregar las imaganes a los hoteles 
     * @param hoteles 
     * @returns 
     */
    public async addImageHotel(hoteles: IHotel[]): Promise<IHotel[]> {
        let hotelWithImage: IHotel[] = [];

        for (let i = 0; i < hoteles.length; i++) {
            let image = await this.ImageComponent.getImageForID(Number(hoteles[i].hotelID));

            hotelWithImage.push({
                hotelID: hoteles[i].hotelID,
                hotelName: hoteles[i].hotelName,
                precio: hoteles[i].precio,
                categoria: hoteles[i].categoria,
                Image: image.urlData,
                createdAt: hoteles[i].createdAt,
                updatedAt: hoteles[i].updatedAt,
            });
        }

        return hotelWithImage;
    }

    /**
     * Creación de hotel
     * @param req 
     * @param res 
     * @returns 
     */
    public async createHotel(req: Request, res: Response) {
        let newHotell: {
            hotelName: 'Miami Bich123',
            precio: 512
        }

        let newHotel: IHotel = {
            hotelName: 'Miami Bich123',
            precio: 512
        } //req.body.datos.newHotel;
        let result: any;

        if (newHotel.hotelName != '' && newHotel.precio > 0) {
            newHotel.categoria = 5; //Por defecto un hotel tiene 5 estrellas
            result = await this.hotelComponent.createHotel(newHotel);
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
     * Actualización de hotel
     * @param req 
     * @param res 
     * @returns 
     */
    public async updateHotel(req: Request, res: Response) {
        let updateHotel: IHotel = {
            hotelID: 6,
            hotelName: 'Miami Bich123 updated',
            precio: 515,
            categoria: 4
        } //req.body.newHotel;
        let result: any;

        if (updateHotel.hotelName != '' && updateHotel.precio > 0 &&
            updateHotel.categoria && updateHotel.categoria >= 1 && updateHotel.categoria <= 5
        ) {
            result = await this.hotelComponent.updateHotel(updateHotel);
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
     * Actualización de categoria (estrellas)
     * @param id_hotel 
     * @param category 
     */
    public async updatedCategory(id_hotel: number, category: number) {
        if (id_hotel > 0 && category > 0 && category <= 5) {
            await this.hotelComponent.updateCategory(id_hotel, category);
        }
    }

    /** Remueve un hotel por Id
     * Borrado de hotel
     * @param req 
     * @param res 
     */
    public async removeHotel(req: Request, res: Response) {
        let id_hotel: number = 6 // req.body.datos.id_hotel
        let result: any;

        if (id_hotel > 0) {
            result = await this.hotelComponent.removeHotel(id_hotel);
        } else {
            result = {
                code: Coderror.ErrorId_Pago,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }
}