import express from "express";
import { usersRouter } from "./users.mjs";
import { postRouter } from "./post-users.mjs";
import { deleteRouter } from "./delete.mjs";
import { updateRouter } from "./updatebyId.mjs";

const app = express();

app.use(express.json());

app.use("/users", usersRouter, postRouter, deleteRouter, updateRouter);

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: "Something went wrong",
  });
});
app.listen(3000, () => {
  console.log("Running server http://localhost:3000");
});
