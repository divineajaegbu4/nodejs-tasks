import express from "express";
const app = express();

import { middleware1, middleware2, middleware3 } from "./middlewareChaining.mjs";
// import router from "../conditional-middleware/comments.mjs";
import { router } from "./route.mjs";

app.use(express.json());

app.use(express.urlencoded({extended: true}))


app.use("/users", router)

app.listen(3000, () => {
    console.log("Running server https://localhost:3000");
})

