"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'cheil',
    username: 'root',
    password: ''
};
exports.sequelize = new sequelize_1.Sequelize(config);
//# sourceMappingURL=database-info.js.map