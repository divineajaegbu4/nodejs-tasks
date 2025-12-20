import express from "express";
import { users } from "./users.mjs";
import { ApiError } from "./api-error.mjs";

export const updateRouter = express.Router();

updateRouter.patch("/:updateId", (req, res, next) => {
    const updateId = Number(req.params.updateId)

    if(!updateId || isNaN(updateId)) {
        res.status(404).json({message: "users not found"})
    }

    const findUsersById = users.find(user => user.id === updateId)

    findUsersById.isCompleted = true

    if(!findUsersById) {
        // res.status(400).json({message: "Something went wrong"})
        return next(new ApiError("Something went wrong", 400))
    }

    res.status(200).json(findUsersById)
})