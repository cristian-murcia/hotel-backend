import { DataTypes, Model } from "sequelize";
import { CreationHotel, IHotel } from "../interfaces/hotel/hotel.interface";
import { sequelize } from '../database/config/database-info';
import { Image } from "./image.model";

export class Hotel extends Model<IHotel, CreationHotel> implements IHotel {
    public hotelID!: number;
    public hotelName!: string;
    public categoria!: number;
    public precio!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Hotel.init(
    {
        hotelID: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        hotelName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z0-9._-]+ ?[a-zA-z0-9._-]+?)+$'],
                    msg: 'Los caracteres no son validos'
                },
                len: {
                    args: [3, 50],
                    msg: 'La cantidad de caracteres va de 3 a 50'
                }
            }
        },
        categoria: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }, 
        precio: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    },
    {
        sequelize,
        tableName: 'hotel'
    }
)

//Relación de 1:M
Hotel.hasOne(Image, {
    foreignKey: {
        name: 'hotel_hotelID',
        allowNull: false
    },
    sourceKey: 'hotelID'
});
Image.belongsTo(Hotel);