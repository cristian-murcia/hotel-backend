import { Optional } from "sequelize";
import { IImage } from "../image";

export interface IHotel {
    hotelID?: number;
    hotelName: string;
    categoria?: number;
    precio: number;
    createdAt?: Date;
    updatedAt?: Date;

    Image?: IImage[];
}

export interface CreationHotel extends Optional<IHotel, 'hotelID'>{};