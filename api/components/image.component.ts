import { ValidationError } from "sequelize";
import { Coderror } from "../enum/coderror.enum";
import { IImage } from "../interfaces";
import { ImageResponse } from "../interfaces/image/image.response";
import { Image } from "../models";
import { Hotel } from '../models/hotel.model';

export class ImageComponent {

    constructor() { }

    /**
     * Retorna las imagenes de un hotel
     * @param id_hotel 
     * @returns 
     */
    public async getImageForID(id_hotel: number): Promise<ImageResponse> {
        try {
            return await Image.findAll(
                {
                    attributes: [
                        `idimage`, `hotel_hotelID`, `urlData`, `createdAt`, `updatedAt`
                    ],
                    where: {
                        hotel_hotelID: id_hotel
                    }, 
                    raw: true
                }
            ).then(result => {
                if (result) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Exitoso',
                        status: 200,
                        urlData: result
                    } as ImageResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No se encontro ninguna imagen',
                        status: 200
                    } as ImageResponse;
                }

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as ImageResponse;
            });
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as ImageResponse;
        }
    }

    /**
     * Guardar imagen de hotel en Base64
     * @param data 
     * @returns 
     */
    public async createImage(data: IImage): Promise<ImageResponse> {
        try {
            return await Image.create({ ...data }, { raw: true })
                .then(result => {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Imagen guardada con exito',
                        status: 200
                    } as ImageResponse;


                }).catch((error: ValidationError) => {
                    return {
                        code: Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    } as ImageResponse;
                })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as ImageResponse;
        }
    }

    /**
     * Actualizar url de una imagen
     * @param data 
     * @returns 
     */
    public async updateImage(data: IImage): Promise<ImageResponse> {
        try {
            return await Image.update(
                data,
                {
                    where: {
                        idimage: data.idimage
                    }
                }
            ).then(result => {
                if (result[0] == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Imagen actualizada con exito',
                        status: 200,
                        body: result
                    } as ImageResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe la imagen',
                        status: 200
                    } as ImageResponse;
                }

            }).catch((error: ValidationError) => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 200,
                    body: error.message
                } as ImageResponse;
            })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as ImageResponse;
        }
    }

    /**
     * Remover una imagen de hotel
     * @param id_image 
     * @returns 
     */
    public async removeImage(id_image: number): Promise<ImageResponse> {
        try {
            return await Image.destroy({
                where: {
                    hotel_hotelID: id_image
                }
            }).then(result => {
                if (result == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Se ha eliminado con exito',
                        status: 200,
                    } as ImageResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe la imagen',
                        status: 200
                    } as ImageResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as ImageResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as ImageResponse;
        }

    }

}