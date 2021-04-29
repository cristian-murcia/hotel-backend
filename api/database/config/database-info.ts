import { Options, Sequelize } from "sequelize";

const config: Options = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'cheil',
    username: 'root',
    password: ''
}

export const sequelize = new Sequelize(config);