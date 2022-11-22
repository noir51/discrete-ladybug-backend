'use strict';

import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import path from 'path';

import { environmentParametersValidation } from './services/env-params-validation';

process.env.BASE_PATH = process.cwd();
dotenv.config();

const ladybug = express();

console.log('Discrete ladybug');
environmentParametersValidation.check();

ladybug.use(cors())
ladybug.use(logger('dev'));
ladybug.use(bodyParser.json({ limit: '50mb' }));
ladybug.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
ladybug.use(cookieParser());

ladybug.set('views', path.join(__dirname, 'views'));
ladybug.set('view engine', 'ejs');

ladybug.use(express.static(path.join(__dirname, 'public')));

ladybug.listen(process.env.SERVER_PORT, () => {
    return console.log(`Listening on port ${process.env.SERVER_PORT} ...`);
})