import { DataTypes, Model } from "sequelize";
import { CreationUsuario, IUsuario } from "../interfaces/usuario/usuario.interface";
import { sequelize } from '../database/config/database-info';
import { Calificacion } from "./calificacion.model";

export class Usuario extends Model<IUsuario, CreationUsuario> implements IUsuario {
    public userID!: number;
    public userName!: string;
    public userSurname!: string;
    public userMail!: string;
    public userPassword!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Usuario.init(
    {
        userID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        userName : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$'],
                    msg: 'EL Nombre no son valido'
                },
                len: {
                    args: [3, 50],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        },
        userSurname : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$'],
                    msg: 'EL Apellido no son valido'
                },
                len: {
                    args: [3, 50],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        },
        userMail : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^[a-zA-Z._-]+@[a-zA-z._-]+\.[a-zA-z]+\.[a-zA-Z]?$'],
                    msg: 'EL Correo no es valido'
                },
                len: {
                    args: [3, 255],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        },
        userPassword : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z0-9._-]+ ?[a-zA-Z0-9._-]+?)+$'],
                    msg: 'La constraseña no son valido'
                },
                len: {
                    args: [3, 255],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        },
    },
    {
        sequelize,
        tableName: 'usuario'
    }
)


