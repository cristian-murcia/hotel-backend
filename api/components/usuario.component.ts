import { ValidationError } from "sequelize";
import { Coderror } from "../enum/coderror.enum";
import { IUsuario, UsuarioResponse } from "../interfaces/usuario";
import { Usuario } from "../models";

export class UsuarioComponent {

    constructor() { }

    /**
     * Retorna todos los usuario
     * @returns 
     */
    public async getUsuarios(): Promise<UsuarioResponse> {
        try {
            return await Usuario.findAll(
                {
                    attributes: [
                        `userID`, `userName`,
                        `userSurname`, `userMail`,
                        `userPassword`, `createdAt`,
                        `updatedAt`],
                    raw: true
                },
            ).then(result => {
                return {
                    code: 0,
                    mensaje: 'Exitoso',
                    status: 200,
                    usuarios: result
                } as UsuarioResponse;

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as UsuarioResponse;
            });

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }
    }

    /**
     * Retorna un usuario por su id
     * @param id_usuario 
     * @returns 
     */
    public async getUsuarioForID(id_usuario: number): Promise<UsuarioResponse> {
        try {
            return await Usuario.findByPk(
                id_usuario,
                {
                    attributes: [
                        `userID`, `userName`,
                        `userSurname`, `userMail`,
                        `userPassword`, `createdAt`,
                        `updatedAt`],
                    raw: true
                },
            ).then(result => {
                if (result) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Exitoso',
                        status: 200,
                        usuario: result
                    } as UsuarioResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No se encontro ningun hotel',
                        status: 200
                    } as UsuarioResponse;
                }

            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error database',
                    status: 500,
                    body: error
                } as UsuarioResponse;
            });
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }
    }

    /**
     * Crea un nuevo usuario
     * @param data 
     * @returns 
     */
    public async createUsuario(data: IUsuario): Promise<UsuarioResponse> {
        try {
            return await Usuario.create({ ...data }, { raw: true })
                .then(result => {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Usuario creado con exito',
                        status: 200,
                        usuario: result
                    } as UsuarioResponse;

                }).catch((error: ValidationError) => {
                    return {
                        code: Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    } as UsuarioResponse;
                })

        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }
    }

    /**
     * Actualiza datos de un usuario
     * @param data 
     * @returns 
     */
    public async updateUsuario(data: IUsuario): Promise<UsuarioResponse> {
        try {
            let result = await this.getUsuarioForID(Number(data.userID));

            if (result.usuario) {
                return await Usuario.update(
                    data,
                    {
                        where: {
                            userID: data.userID
                        }
                    }
                ).then(result => {
                    if (result[0] == 1) {
                        return {
                            code: Coderror.Exitoso,
                            mensaje: 'Usuario actualizado con exito',
                            status: 200,
                            hotel: result[1]
                        } as UsuarioResponse;
                    } else {
                        return {
                            code: Coderror.Exitoso,
                            mensaje: 'No se ha actualizado el usuario, intente de nuevo',
                            status: 200
                        } as UsuarioResponse;
                    }

                }).catch((error: ValidationError) => {
                    return {
                        code: Coderror.ErrorDatabase,
                        mensaje: 'Error Database',
                        status: 200,
                        body: error.message
                    } as UsuarioResponse;
                })
            } else {
                return {
                    code: Coderror.Exitoso,
                    mensaje: 'No existe el usuario',
                    status: 200
                } as UsuarioResponse;
            }




        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }
    }

    /**
     * Remover un usuario por su id
     * @param id_usuario 
     * @returns 
     */
    public async removeUsuario(id_usuario: number): Promise<UsuarioResponse> {
        try {
            return await Usuario.destroy({
                where: {
                    userID: id_usuario
                }
            }).then(result => {

                if (result == 1) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Se ha eliminado con exito',
                        status: 200,
                    } as UsuarioResponse;
                } else {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'No existe el usuario',
                        status: 200
                    } as UsuarioResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as UsuarioResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }

    }

    /**
     * COmprueba los datos basicos de usuario para inicio de sesión
     * @param email 
     * @param password 
     * @returns 
     */
    public async loginUsuario(email: string, password: string): Promise<UsuarioResponse> {
        try {
            return await Usuario.findOne(
                {
                    attributes: [
                        `userID`, `userName`, `userSurname`, `userMail`,
                        `userPassword`, `createdAt`, `updatedAt`,
                    ],
                    where: {
                        userMail: email,
                        userPassword: password
                    },
                    raw: true
                }
            ).then(result => {
                if (result != null) {
                    return {
                        code: Coderror.Exitoso,
                        mensaje: 'Ingreso exitoso',
                        status: 200,
                        usuario: result
                    } as UsuarioResponse;
                } else {
                    return {
                        code: Coderror.SesionInvalida,
                        mensaje: 'La información de usuario no es valida',
                        status: 200
                    } as UsuarioResponse;
                }
            }).catch(error => {
                return {
                    code: Coderror.ErrorDatabase,
                    mensaje: 'Error Database',
                    status: 500,
                    body: error
                } as UsuarioResponse;
            })
        } catch (error) {
            return {
                code: Coderror.ErrorServer,
                mensaje: 'Error Internal Server',
                status: 500,
                body: error
            } as UsuarioResponse;
        }
    }

}