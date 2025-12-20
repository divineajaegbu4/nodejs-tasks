import express from "express";
import { faker } from "@faker-js/faker";
import { users } from "./users.mjs";

export const postRouter = express.Router();

postRouter.post("/newUsers", (req, res) => {
  const {
    firstName,
    lastName,
    middleName,
    sex,
    gender,
    isCompleted,
    internet = {},
    food = [],
  } = req.body || {};

  const { email, displayName, username } = internet;
  const [{ vegetable, fruit, spice, dish, meat, ingredient }] = food;
  // const [{ vegetable, fruit, spice, dish, meat, ingredient } = {}] = food;

  const data = {
    id: users.length + 1,
    firstName,
    lastName,
    middleName,
    sex,
    gender,
    isCompleted,
    internet: {
      email,
      displayName,
      username,
    },
    image: {
      url: faker.image.url(),
      avatar: faker.image.avatar(),
    },
    food: [{ vegetable, fruit, spice, dish, meat, ingredient }],
  };

  users.push(data);
  res.status(201).json(data);
});
