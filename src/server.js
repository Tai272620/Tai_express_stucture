
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const server = express();

/* Connect MySQL */
import mySQL from './databases/mySQL';
import { mysqlConnect } from './databases/mySQL';
mysqlConnect()

/* Body Parser */
import bodyParser from 'body-parser';
server.use(bodyParser.json());
/* Setup Views */
import viewsConfig from './views';
server.use('/views', viewsConfig);

/* Setup API */
import routerConfig from './routes';
server.use('/apis', routerConfig);



server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server running on: ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`);
})


