import express, { Application } from "express";
import bodyParser from 'body-parser';

//Ruotes
import route from './routes/index';
import { database } from "./database/config/connection";

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.setting();
        this.middleware();
        this.routes();
    }

    private setting() {
        this.app.set('port', this.port);
    }

    private middleware() {
        this.app.use(bodyParser.json());
        this.app.use(express.json());
    }

    private routes() {
        this.app.use('/api', route)
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Api corriendo en el puerto ', this.app.get('port'));
        database.connection();
    }



}