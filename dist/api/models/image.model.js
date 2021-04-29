"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const sequelize_1 = require("sequelize");
const database_info_1 = require("../database/config/database-info");
class Image extends sequelize_1.Model {
}
exports.Image = Image;
Image.init({
    idimage: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    hotel_hotelID: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    urlData: {
        type: sequelize_1.DataTypes.STRING,
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
}, {
    sequelize: database_info_1.sequelize,
    tableName: 'image'
});
//# sourceMappingURL=image.model.js.map