import { Association, DataTypes, Model } from "sequelize";
import { sequelize } from '../database/config/database-info';
import { ICalificacion, CreationCalificacion } from "../interfaces/calificacion/calificacion.interface";
import { Usuario } from "./usuario.model";

export class Calificacion extends Model<ICalificacion, CreationCalificacion> implements ICalificacion {
    public idcalificacion!: number;
    public hotel_hotelID!: number;
    public usuario_userID!: number;
    public estrellas!: number;
    public comentario!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Calificacion.init(
    {
        idcalificacion: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        hotel_hotelID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        usuario_userID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        estrellas: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comentario: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$'],
                    msg: 'Los caracteres no son validos'
                },
                len: {
                    args: [3, 50],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        }
    },
    {
        sequelize,
        tableName: 'calificacion'
    }
)

//Calificacion.hasOne(Usuario, { foreignKey: 'idcalificacion'});
Calificacion.hasOne(Usuario, {
    foreignKey: {
        name: 'userID',
        allowNull: false,
    },
    sourceKey: 'usuario_userID',
});
Usuario.belongsTo(Calificacion);