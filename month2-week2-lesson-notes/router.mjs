import express from "express";
import { ApiError } from "./api-error.mjs";

export const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    if (!req.params.id) {
      throw new ApiError("An error occured", 404);
    }
    res.send(`userId: ${req.params.id}`);
  } catch (err) {
    // res.status(500).send("Server is not working");
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (res.status === 500) {
      throw new ApiError("Internal Server Error", 500);
    }

    res.send("Hello everyone");
  } catch (err) {
    next(err);
  }
});

// export default router
