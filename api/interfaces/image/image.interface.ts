import { Optional } from "sequelize";

export interface IImage {
    idimage?: number;
    hotel_hotelID: number;
    urlData: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreationImage extends Optional<IImage, 'idimage'>{};