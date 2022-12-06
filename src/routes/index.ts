'use strict';

import { Router } from 'express';

import authRouter from './users/auth.router';

export default function (router: Router) {
    router.use('/user/auth', authRouter);
    // router.use('/user', userRouter);
}