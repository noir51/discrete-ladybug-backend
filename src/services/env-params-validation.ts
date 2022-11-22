'use strict';

export const environmentParametersValidation = {
    check: () => {
        switch(true) {
            case process.env.SERVER_URL === undefined:
                throw new Error('Missing environment variable: SERVER_URL');
            case process.env.SERVER_HOST === undefined:
                throw new Error('Missing environment variable: SERVER_HOST');
            case process.env.SERVER_PORT === undefined:
                throw new Error('Missing environment variable: SERVER_PORT');
            case process.env.APPLICATION_NAME === undefined:
                throw new Error('Missing environment variable: APPLICATION_NAME');
            case process.env.NODE_ENVIRONMENT === undefined:
                throw new Error('Missing environment variable: NODE_ENVIRONMENT');
            case process.env.TOKENLIFE === undefined:
                throw new Error('Missing environment variable: TOKENLIFE');
            case process.env.JWT_SECRET === undefined:
                throw new Error('Missing environment variable: JWT_SECRET');
            case process.env.TOKENLIFE_REFRESH_TOKEN === undefined:
                throw new Error('Missing environment variable: TOKENLIFE_REFRESH_TOKEN');
            case process.env.JWT_SECRET_REFRESH_TOKEN === undefined:
                throw new Error('Missing environment variable: JWT_SECRET_REFRESH_TOKEN');
            case process.env.TOKENLIFE_FORGOT_PASSWORD_TOKEN === undefined:
                throw new Error('Missing environment variable: TOKENLIFE_FORGOT_PASSWORD_TOKEN');
            case process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN === undefined:
                throw new Error('Missing environment variable: JWT_SECRET_FORGOT_PASSWORD_TOKEN');
            default:
                console.log('Environment parameters are OK.')
        }
    }
}