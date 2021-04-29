import { Optional } from "sequelize";

export interface IUsuario {
    userID?: number;
    userName: string;
    userSurname: string;
    userMail: string;
    userPassword: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreationUsuario extends Optional<IUsuario, 'userID'>{};