import express from "express";

const router = express.Router();

const initWebRoutes = () => {
    router.get("/", (req, res) => {
        return res.send("hello world");
    })
}