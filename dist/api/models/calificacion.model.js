"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calificacion = void 0;
const sequelize_1 = require("sequelize");
const database_info_1 = require("../database/config/database-info");
class Calificacion extends sequelize_1.Model {
}
exports.Calificacion = Calificacion;
Calificacion.init({
    idcalificacion: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hotel_hotelID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    usuario_userID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    estrellas: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    comentario: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    sequelize: database_info_1.sequelize,
    tableName: 'calificacion'
});
//# sourceMappingURL=calificacion.model.js.map