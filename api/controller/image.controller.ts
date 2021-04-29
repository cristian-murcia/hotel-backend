import { Request, Response } from 'express';
import { ImageComponent } from '../components/image.component';
import { Coderror } from '../enum';
import { IImage, IUsuario } from '../interfaces';
import { ResponseNetWork } from '../network/response.network';

export class ImageController {

    public imageComponent: ImageComponent;
    public response: ResponseNetWork;

    constructor() {
        this.response = new ResponseNetWork();
        this.imageComponent = new ImageComponent();
    }

    /**
     * Retorna una lista de imagen por id_hotel
     * @param req 
     * @param res 
     * @returns 
     */
    public async getImageForId(req: Request, res: Response) {
        let id_hotel: number = 2;//Number(req.body.datos.id_hotel);
        let result;
        if (id_hotel > 0) {
            result = await this.imageComponent.getImageForID(id_hotel);
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
     * Creación una imagen nueva
     * @param req 
     * @param res 
     * @returns 
     */
    public async createImage(req: Request, res: Response) {
        let newImage: IImage = {
            hotel_hotelID: 2,
            urlData: 'tercera imagen'
        } //req.body.datos.newImage;
        let result: any;

        if (
            newImage.hotel_hotelID > 0 && newImage.urlData != ''
        ) {
            result = await this.imageComponent.createImage(newImage);
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
     * Actualiza una imagen
     * @param req 
     * @param res 
     * @returns 
     */
    public async updateImage(req: Request, res: Response) {
        let newImage: IImage = {
            idimage: 1,
            hotel_hotelID: 2,
            urlData: 'tercera imagen'
        } //req.body.datos.newImage;
        let result: any;

        if (
            newImage.idimage &&
            newImage.hotel_hotelID > 0 && newImage.urlData != ''
        ) {
            result = await this.imageComponent.updateImage(newImage);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

    /** Remueve una imagen por id
     * @param req 
     * @param res 
     */
    public async removeImage(req: Request, res: Response) {
        let id_image: number = 6 // req.body.datos.id_image
        let result: any;

        if (id_image > 0) {
            result = await this.imageComponent.removeImage(id_image);
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