import express from "express";

export const prouductRouter = express.Router();

router.get("/", (req, res) => {
    res.send("This is my products")
})