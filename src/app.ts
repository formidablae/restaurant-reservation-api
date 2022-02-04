import bodyParser from "body-parser";
import express, { Application, Request, Response } from "express";

const app: Application = express()

app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }))

if (!process.env.ALREADY_SET) {
    require('dotenv').config();
    process.env.ALREADY_SET = 'true';
}

app.get("/api", (req: Request, res: Response) => {
    res.send("API is Running")
})

app.use((req, res, next) => {
    res.send("Running");
});

export { app };
