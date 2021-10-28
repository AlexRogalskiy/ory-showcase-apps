import express from 'express';
import bodyParser from "body-parser";
import routes from "./routes";
require('dotenv').config();

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.listen(port, () => {
    console.log("Running on port " + port);
    routes(app);
});


