'use strict';

import { Router } from 'express';
import { body, check } from 'express-validator';

import { authController } from '../../controllers/users/auth.controller';

import { middleware } from '../../services/middleware';
import { responseMessages } from '../../services/response-messages';

const router = Router();

const authRegisterParams: string[] = ['first_name', 'last_name', 'email', 'ssn', 'id_number', 'date_of_birth', 'password'];

router.post(
    '/register',
    check(authRegisterParams).exists().withMessage(responseMessages.requestParams.inexistent),
    check(authRegisterParams).not().isEmpty().withMessage(responseMessages.requestParams.empty),
    check([authRegisterParams[2]]).isEmail().toLowerCase().withMessage(responseMessages.requestParams.invalidEmail),
    check([authRegisterParams[5]]).isDate({ format: 'YYYY-MM-DD' }).withMessage(responseMessages.requestParams.invalidDate),
    body([authRegisterParams[2]]).escape(),
    middleware.checkForErrors,

    authController.register 
)

export default router;