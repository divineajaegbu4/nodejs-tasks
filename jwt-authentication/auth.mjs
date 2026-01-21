import express from "express"
import { router } from "./routes.mjs"
import { globalError } from "./general-error.mjs"

const app = express();

const port = process.env.PORT;
const hostname = "localhost";

app.use(express.json())

app.use("/users", router)

app.use(globalError)

app.listen(port, () => {
    console.log(`Server running: http://${hostname}:${port}`);
})