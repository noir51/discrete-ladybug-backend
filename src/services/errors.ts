'use strict';

export const errors = {
    formatError: async (error: any = {}, message: string = '', category: string = 'global') => {
        let errors = [];

        message = error?.response?.data?.error?.message || error?.response?.data || error.message || message || error;

        if (category === 'global') {
            errors.push({
                field: 'global',
                message: message
            });
        } else {
            for (const prop in error) {
                errors.push({
                    field: prop,
                    message: error[prop].msg || message
                });
            }
        }

        return {
            fieldErrors: [...(category === 'field' ? errors : [])],
            globalErrors: [...(category === 'global' || category === 'query' ? errors : [])]
        };
    },

    errorsMiddleware: async (error: any, req: any, res: any, next: any) => {
        switch (error.name) {
            case 'BadRequestError':
            case 'MulterError':
            case 'UploadError':
                res.status(400);
                break;
            case 'UnauthorizedError':
                res.status(401);
                break;
            case 'NotFoundError':
                res.status(404);
                break;
            case 'ConflictError':
                res.status(409);
                break;
            case 'UnprocessableEntityError':
                res.status(422);
                break;
            default:
                console.log('Internal Server Error: ', error.response || error);
                res.status(500);
        }

        let response = await errors.formatError(error);
        return res.json(response);
    }
};