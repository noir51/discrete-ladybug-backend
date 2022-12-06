'use strict';

import { validationResult } from 'express-validator';
import { expressjwt } from 'express-jwt';
import { errors } from './errors';

export const middleware = {
    logJWT: (req: any, res: any, next: any) => {
        if (req.headers.authorization) {
            console.log(req.headers.authorization); 
        }
        
        return next();
    },

    checkJwt: expressjwt({
        secret: `${process.env.JWT_SECRET}`,
        algorithms: ['RS512', 'HS512'],
    }).unless({
        path: [
            /^\/user\/auth\/register\/*/
        ]
    }),
    
    checkRequestValidity: (req: any, res: any, next: any) => {
        const method = req.method, conType = req.headers['content-type'];
        let isValid: boolean, message: string;
    
        switch (method) {
            case 'GET':
                isValid = (!conType || (conType.indexOf('application/json') === 0));
                message = 'Unsupported Content-Type for GET method. Use: application/json';
                break;
            case 'POST':
                isValid = (conType && (conType.indexOf('application/json') === 0 || conType.indexOf('multipart/form-data') === 0));
                message = 'Unsupported Content-Type for POST method. Use: application/json or multipart/form-data';
                break;
            case 'PUT':
                isValid = (!conType || (conType.indexOf('application/json') === 0 || conType.indexOf('multipart/form-data') === 0));
                message = 'Unsupported Content-Type for PUT method. Use: application/json or multipart/form-data';
                break;
            case 'DELETE':
                isValid = (!conType || (conType.indexOf('application/json') === 0));
                message = 'Unsupported Content-Type for DELETE method. Use: application/json';
                break;
            default:
                isValid = false;
                message = 'Unsupported request method';
        }
    
        if (!isValid) {
            const e = new Error(message);
            e.name = 'BadRequestError';
            return next(e);
        }
    
        return next();
    },
    
    checkForErrors: async (req: any, res: any, next: any) => {
        let validationErrors = validationResult(req);

        if (!validationErrors.isEmpty()) {
            if (validationErrors.array()[0].nestedErrors) {
                const e = new Error('Nothing to update');
                e.name = 'BadRequestError';
                return next(e);
            } 
            
            let response = await errors.formatError( validationErrors.mapped(), '', 'field');
            return res.status(422).json(response);
        }

        return next();
    },

    ownProfile: (req: any, res: any, next: any) => {
        if (req.user.id.toString() !== req.params.userId) {
            const e = new Error('JWT does not match requested profile');
            e.name = 'UnauthorizedError';
            return next(e);
        }
        
        return next();
    }
}