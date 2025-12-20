import express from "express";
import { users } from "./users.mjs";

export const deleteRouter = express.Router();


deleteRouter.delete("/:userId", (req, res) => {
    let usersId = Number(req.params.userId)

    if(!usersId || isNaN(usersId)) {
        res.status(404).json({mesage: "UserId is not found"})
    }
    const index = users.findIndex(user => user.id === usersId)

    if(!users || index === -1) {
        res.status(400).json({message: "user not found"})
    }

    users.splice(index, 1)
    res.status(200).json(users)
})