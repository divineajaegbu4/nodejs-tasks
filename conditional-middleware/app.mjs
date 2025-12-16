import express from "express";
const app = express();

import { ApiError } from "./ApiError.mjs";
import { userRouter } from "./users.mjs";
import { prouductRouter } from "./products.mjs";
import { commentRouter } from "./comments.mjs";
import { conditionalMiddleware,  getMiddleware} from "./conditional-middleware.mjs";

app.use(express.json()); // For JSON
app.use(express.urlencoded({ extended: true })); // For Form


app.use(conditionalMiddleware(getMiddleware))

app.use("/users", userRouter)
app.use("/products", prouductRouter)
app.use("/comments", commentRouter)

app.use((req, res, next) => {
  next(new ApiError("Server Error", 500))
})

app.listen(3000, () => {
   console.log("Starting server https://localhost:3000");
})
