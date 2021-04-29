import { Response } from "express";

export class ResponseNetWork {

    constructor() { }

    public response(data: any, status: number, res: Response): Response {
        return res.status(status).send({
            data: data
        });
    }
}