import createError from "http-errors"
import logger from 'morgan'
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"

import { router } from "./hello-world.mjs"

const app = express();

app.use(express.json())

app.use(logger("dev"))

app.use("/names", router);

app.use((req, res, next) => {
    next(createError(404))
})

app.listen(3000, (req, res) => {
    console.log("Server running http://localhost:3000");
})