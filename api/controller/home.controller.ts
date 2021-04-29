import { Request, Response } from "express";
import { CalificacionController, ImageController, HotelController, UsuarioController } from "../controller/";
import { Process } from "../enum/process.enum";
import { AuthJwt } from "../middleware";

export class HomeController {

    constructor() { }

    public encode(req: Request, res: Response) {
        return res.json({
            token: AuthJwt.sign(req.body),
        });
    }

    public async envio(req: Request, res: Response) {
        let hotelController = new HotelController();
        let calificacionController = new CalificacionController();
        let usuarioController = new UsuarioController();
        let imageController = new ImageController();

        let proceso: number = req.body.datos.proceso;

        switch (proceso) {
            case Process.getHotels:
                await hotelController.getHotels(req, res);
                break;
            case Process.getHotelForId:
                await hotelController.getHotelForId(req, res);
                break;
            case Process.createHotel:
                await hotelController.createHotel(req, res);
                break;
            case Process.updatedHotel:
                await hotelController.updateHotel(req, res);
                break;
            case Process.removeHotel:
                await hotelController.removeHotel(req, res);
                break;
            case Process.getHotelsFilter:
                await hotelController.gethotelOrder(req, res);
                break;
            case Process.getHotelsForStart:
                await hotelController.getHotelForStart(req, res);
                break;

            case Process.getCalificacionForHotel:
                await calificacionController.getCalificaciones(req, res);
                break;
            case Process.getCalificacionForId:
                await calificacionController.getCalificacionForId(req, res);
                break;
            case Process.createCalificacion:
                await calificacionController.createCalificacion(req, res);
                break;
            case Process.updatedcalificacion:
                await calificacionController.updateCalificacion(req, res);
                break;
            case Process.removeCalificacion:
                await calificacionController.removeCalificacion(req, res);
                break;

            case Process.getUsuarios:
                await usuarioController.getUsuarios(req, res);
                break;
            case Process.getUserForId:
                await usuarioController.getUsuarioForId(req, res);
                break;
            case Process.createUsuario:
                await usuarioController.createUsuario(req, res);
                break;
            case Process.updatedUsuario:
                await usuarioController.updateUsuario(req, res);
                break;
            case Process.removeUsuario:
                await usuarioController.removeUsuario(req, res);
                break;

            case Process.login:
                await usuarioController.login(req, res);
                break;

            case Process.getimageForID:
                await imageController.getImageForId(req, res);
                break;
            case Process.createImageForID:
                await imageController.createImage(req, res);
                break;
            case Process.updateImage:
                await imageController.updateImage(req, res);
                break;
            case Process.removeImage:
                await imageController.removeImage(req, res);
                break;

        }
    }


    public decode(req: Request, res: Response): Response {
        return res.json({
            token: AuthJwt.decodeToken(req.body),
        });
    }

}