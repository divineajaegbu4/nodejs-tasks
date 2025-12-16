import express from "express"

export const userRouter = express.Router();

userRouter.get("/:id", (req, res) => {
    res.send(`UserId: ${req.params.id}`)
})