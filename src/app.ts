import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as errorhandler from 'strong-error-handler';
import {employees} from "./routes/employees";
import {vacations} from "./routes/vacations"

export const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const startDate = new Date();
const getUpTime = () => {
    return (new Date()).getTime() - startDate.getTime();
};

// middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// middleware for json body parsing
app.use(bodyParser.json({limit: '5mb'}));

// enable corse for all origins
app.use((req: any, res: { header: { (arg0: string, arg1: string): void; (arg0: string, arg1: string): void; (arg0: string, arg1: string): void; (arg0: string, arg1: string): void; }; }, next: () => void) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Expose-Headers", "x-total-count");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Content-Type,authorization");

    next();
});

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/employees', employees);
app.use('/vacations', vacations);
app.use('/health-check', (req: any, res: { json: (arg0: { startDate: Date; upTime: number; }) => void; }, next: any) => {
    res.json({
        startDate,
        upTime: getUpTime()
    });
});


app.use(errorhandler({
    debug: process.env.ENV !== 'prod',
    log: true,
}));
