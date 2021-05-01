import { Request, Response } from 'express';
import { UsuarioComponent } from '../components/usuario.component';
import { Coderror } from '../enum';
import { IUsuario } from '../interfaces';
import { ResponseNetWork } from '../network/response.network';

export class UsuarioController {

    public usuarioComponent: UsuarioComponent;
    public response: ResponseNetWork;

    constructor() {
        this.response = new ResponseNetWork();
        this.usuarioComponent = new UsuarioComponent();
    }

    /**
     * Retorna todos los usuario
     * @param req 
     * @param res 
     * @returns 
     */
    public async getUsuarios(req: Request, res: Response) {
        let result = await this.usuarioComponent.getUsuarios();

        return this.response.response(result, result.status, res)
    }

    /**
     * Retorna un usuario por id
     * @param req 
     * @param res 
     * @returns 
     */
    public async getUsuarioForId(req: Request, res: Response) {
        let id_usuario: number = Number(req.body.datos.id_usuario);
        let result;
        if (id_usuario > 0) {
            result = await this.usuarioComponent.getUsuarioForID(id_usuario);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Error de id_usuario',
                status: 200
            }
        }
        return this.response.response(result, result.status, res);
    }

    /**
     * Creación de un nuevo usuario
     * @param req 
     * @param res 
     * @returns 
     */
    public async createUsuario(req: Request, res: Response) {
        let newUsuario: IUsuario = req.body.datos.newUsuario;
        let result: any;

        if (
            newUsuario.userName != '' && newUsuario.userSurname != '' &&
            newUsuario.userMail != '' && newUsuario.userPassword != ''
        ) {
            result = await this.usuarioComponent.createUsuario(newUsuario);
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
     * Actualiza los datos de un usuario
     * @param req 
     * @param res 
     * @returns 
     */
    public async updateUsuario(req: Request, res: Response) {
        let updatedUsuario: IUsuario = {
            userID: 1,
            userName: 'Rocio',
            userSurname: 'murcia',
            userPassword: '12345',
            userMail: 'rociomurcia@cheil.com'
        } //req.body.datos.updatedUsuario;
        let result: any;

        if (
            updatedUsuario.userID &&
            updatedUsuario.userName != '' && updatedUsuario.userSurname != '' &&
            updatedUsuario.userMail != '' && updatedUsuario.userPassword != ''
        ) {
            result = await this.usuarioComponent.updateUsuario(updatedUsuario);
        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

    /** Remueve un usuario por su id
     * Borrado de hotel
     * @param req 
     * @param res 
     */
    public async removeUsuario(req: Request, res: Response) {
        let id_usuario: number = 6 // req.body.datos.id_usuario
        let result: any;

        if (id_usuario > 0) {
            result = await this.usuarioComponent.removeUsuario(id_usuario);
        } else {
            result = {
                code: Coderror.ErrorId_Pago,
                mensaje: 'Los parametros no son validos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

    public async login(req: Request, res: Response) {
        let email: string = req.body.datos.email;
        let clave: string = req.body.datos.clave;
        let result: any;

        if (email != '' && clave != '') {
            result = await this.usuarioComponent.loginUsuario(email, clave);

        } else {
            result = {
                code: Coderror.ErrorParametro,
                mensaje: 'Parametros de login invalidos',
                status: 200
            }
        }

        return this.response.response(result, result.status, res);
    }

}