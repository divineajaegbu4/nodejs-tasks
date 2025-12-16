import express from "express"
export const commentRouter = express.Router();


commentRouter.get("/:id", (res, req) => {
    res.send(`postId: ${req.params.id}`)
})

commentRouter.get("/", (req, res) => {
    res.send("Hello my dear")
})

export default commentRouter