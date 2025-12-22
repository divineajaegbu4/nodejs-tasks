import express from "express";
import { users } from "./users.mjs";
import { ApiError } from "./api-error.mjs";

export const updateRouter = express.Router();

updateRouter.patch("/:updateId", (req, res, next) => {
  let { firstName, isCompleted, lastName, middleName } = req.body;

  console.log(firstName);
  const updateId = Number(req.params.updateId);

  if (!updateId || isNaN(updateId)) {
    res.status(404).json({ message: "users not found" });
  }

  const findUsersById = users.find((user) => user.id === updateId);

  // We didn't use destructuring here because we are updating the object.
  // Destructuring only reads values and cannot update the original data.
  findUsersById.firstName = firstName;
  findUsersById.lastName = lastName;
  findUsersById.middleName = middleName;
  findUsersById.isCompleted = isCompleted;

  const removeOldUsers = users.findIndex((user) => user.id === updateId);

  if (!findUsersById || removeOldUsers === -1) {
    // res.status(400).json({message: "Something went wrong"})
    return next(new ApiError("Something went wrong", 400));
  }

  users.splice(removeOldUsers, 1);

  users.push(findUsersById);
  res.status(200).json(users);
});
