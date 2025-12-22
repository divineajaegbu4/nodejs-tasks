import express from "express";
import { faker } from "@faker-js/faker";
import { users } from "./users.mjs";

export const postRouter = express.Router();

postRouter.post("/newUsers", (req, res) => {
  const newUsers = req.body;

  const userId = users.length + 1;

  const data = {
    id: userId,
    ...newUsers
  }

  users.push(data)

  res.status(201).json(users)


});
