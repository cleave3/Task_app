import express, { json, urlencoded } from "express";
import cors from "cors";
import DBconnection from './config/DB';
import router from "./router";

DBconnection()

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(router);

export default app;