import express from "express";
import {
  middleware1,
  middleware2,
  middleware3,
} from "./middlewareChaining.mjs";

export const router = express.Router();

// router.use(middleware1)
// router.use(middleware2)
// router.use(middleware3)

router.get("/:id", middleware1, middleware2, middleware3, (req, res) => {
  res.json({
    userData: req.output,
    userId: req.params.id,
  });
});

router.post("/", (req, res) => {
  res.send("Hi everyone");
});
