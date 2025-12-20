import express from "express";
import { faker } from "@faker-js/faker";

const usersRouter = express.Router();

let users = [];
console.log(faker);

for (let i = 0; i < 100; i++) {
  const data = {
    id: i + 1,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    middleName: faker.person.middleName(),
    sex: faker.person.sex(),
    gender: faker.person.gender(),
    isCompleted: false,
    internet: {
      email: faker.internet.email(),
      displayName: faker.internet.displayName(),
      username: faker.internet.username(),
    },

    image: {
      url: faker.image.url(),
      avatar: faker.image.avatar(),
    },
    food: [
      {
        vegetable: faker.food.vegetable(),
        fruit: faker.food.fruit(),
        spice: faker.food.spice(),
        dish: faker.food.dish(),
        meat: faker.food.meat(),
        ingredient: faker.food.ingredient(),
      },
    ],
  };

  users.push({ ...data });
}

usersRouter.get("/", (req, res) => {
  if (!users || users.length == 0) {
    res.status(404).json({ message: "Users not found" });
  }

  res.status(200).json(users);
});


export {usersRouter, users}
