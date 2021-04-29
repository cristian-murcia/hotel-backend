import { DataTypes, Model } from "sequelize";
import { CreationImage, IImage } from "../interfaces/image/image.interface";
import { sequelize } from '../database/config/database-info';
import { Hotel } from "./hotel.model";

export class Image extends Model<IImage, CreationImage> implements IImage {
    public idimage!: number;
    public hotel_hotelID!: number;
    public urlData!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Image.init(
    {
        idimage: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        hotel_hotelID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        urlData: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: {
                    args: ['^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$'],
                    msg: 'Los caracteres no son validos'
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
        tableName: 'image'
    }
)

//Relación de 1:1
/*Image.hasOne(Hotel, {
    foreignKey: {
        name: 'hotelID',
        allowNull: false
    },
    sourceKey: 'hotel_hotelID'
});
Hotel.belongsTo(Image);*/