import bodyParser from "body-parser";
import express, { Application } from "express";
import { routes as apiRoutes } from './routes/index';


const app: Application = express()

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }))

if (!process.env.ALREADY_SET) {
    require('dotenv').config();
    process.env.ALREADY_SET = 'true';
}

app.use("/api", apiRoutes);

export { app };
