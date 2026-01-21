import express from "express"
import { router } from "./auth.mjs"

const app = express()

const port = process.env.PORT

app.use(express.json())

app.use("/api/auth", router)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500

    const errContent = {
        status: "error",
        message: err.message
    }

    res.status(statusCode).json(errContent)
})

app.listen(port, () => {
    console.log(`Server running https://localhost:${port}`)
})

