const env = process.env.NODE_ENVIRONMENT

import * as databaseConfig from '../config/database.json';
import { Sequelize } from 'sequelize-typescript';

let config: any = {};
let databaseLogging: boolean = false;

switch (env) {
    case 'local':
        config = databaseConfig.local;
        databaseLogging = true;
        break;

    // TODO: place other environments here
    
    default:
        config = databaseConfig.local;
        databaseLogging = true;
}

export const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    models: [`${__dirname}/!(index|enums).js`],
    logging: databaseLogging,
	pool: {
		max: 10,
		min: 0,
		acquire: 60000,
		idle: 10000,
	}
});

sequelize.sync();