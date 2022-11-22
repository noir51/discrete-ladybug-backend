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
            default:
                console.log('Environment parameters are OK.')
        }
    }
}