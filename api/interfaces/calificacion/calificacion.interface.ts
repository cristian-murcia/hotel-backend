import { Optional } from "sequelize";

export interface ICalificacion {
    idcalificacion?: number;
    usuario_userID: number;
    hotel_hotelID: number;
    estrellas: number;
    comentario: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreationCalificacion extends Optional<ICalificacion, "idcalificacion"> {}