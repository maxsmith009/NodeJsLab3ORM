import {Sequelize} from 'sequelize-typescript';
import {Op} from 'sequelize';
import {Employee} from "./models/Employee";
import {credentials} from "./constants";
import {Vacation} from "./models/Vacation";

// @ts-ignore
export const sequelize = new Sequelize({
    dialect: 'postgres',
    operatorsAliases: Op,
    username: credentials.user,
    password: credentials.password,
    database: credentials.database,
    storage: ':memory:',
    models: [__dirname + '/models']
});

sequelize.addModels([Vacation]);
sequelize.addModels([Employee]);

