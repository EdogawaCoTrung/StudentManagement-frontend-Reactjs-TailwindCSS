import bodyParser from "body-parser";
import Connection from "./config/connnectDB";
import express from "express";
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

Connection();
app.listen(PORT, () => {
    console.log("backend is running in port: " + PORT);
});