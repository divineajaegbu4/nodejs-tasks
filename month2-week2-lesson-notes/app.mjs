import express from "express";
import {router} from "./router.mjs";
import { logger } from "./middleware.mjs";
import { errorHandling } from "./error-middleware.mjs";
import { ApiError } from "./api-error.mjs";


const app = express();

app.use(express.json());

app.use(logger);
app.get("/", (req, res) => {
  res.send("Hello my first API");
});

app.use("/v1/users", router);

app.use(errorHandling)

app.use((req, res, next) => {
  const err = new Error("User not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
    const message = err.message || "User not found";
    const statusCode = err.status || 404;

    res.status(statusCode).json({
      status: "error",
      message,
      statusCode
    })
})


app.listen(3000, () => {
  console.log("Server loading...");
});
