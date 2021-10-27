import express from 'express';
// import config from "config";
import routes from "./routes";
import log from './logger';
const swaggerUi = require('swagger-ui-express');
import swaggerDocument from './swagger/swagger';
import * as fs from "fs";
import bodyParser from "body-parser";
require('dotenv').config();

const port = process.env.PORT || 8080;
// const host = config.get("host") as string;

const app = express();

if(process.env.DEV !== "TRUE") {
    // @ts-ignore
    fs.appendFileSync('./build/src/db/wc-key.json', process.env.FIRESTORE_KEYS)
}

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.listen(port, () => {
    log.info(`Server is listening on ${port}`);
    routes(app);
});
