import { sequelize } from "./database-info";

export const database = {
    connection: async function(){
        try {
            await sequelize.authenticate();
            console.log('la conexion es satisfactoria');
            
        } catch (error) {
            console.log('Error ' + error);
            
        }
    }
}