import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../../config';

export const AuthJwt = {

    sign: function (data: any) {
        return jwt.sign(data, config.jwt.secret);
    },

    verify: function (req: Request, res: Response, next: any) {
        jwt.verify(req.body.data, config.jwt.secret, (error: any, payload: any) => {
            if (error) {
                return res.status(200).send({
                    code: 1,
                    mensaje: 'Token invalido'
                })
            } else if (
                !payload.token || payload.token == "" ||
                !payload.proceso || payload.proceso == ""
            ) {
                return res.status(200).send({
                    code: 6,
                    mensaje: 'Información basica incorrecta'
                })
            }
            payload['user'] = jwt.decode(payload.token);
            req.body = payload;
            return next();
        });
    },

    decodeToken: function (token: string) {
        return jwt.decode(token, { json: true});
    }
}

