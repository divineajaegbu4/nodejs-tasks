import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApiError } from "./class-error.mjs";

export const router = express.Router();

dotenv.config();

const users = [];

router.post("/generateToken", (req, res) => {
  const jwt_scret_key = process.env.JWT_SECRET_KEY;

  const { userId, email } = req.body;

  const id = users.length + 1;

  const payloadClaims = {
    id,
    userId,
    email,
  };

  users.push(payloadClaims);

  const token = jwt.sign(payloadClaims, jwt_scret_key);

  res.status(201).json({ token });
});

// Authentication happens here
router.get("/validateToken", (req, res, next) => {
  try {
    const jwt_scret_key = process.env.JWT_SECRET_KEY;
    // const token_header_key = process.env.TOKEN_HEADER_KEY;
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new ApiError("Not authorized", 401));
    }

    // const token = req.header(token_header_key);

    console.log(authHeader);

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(new ApiError("request is rejected", 401));
    }

    const verifyToken = jwt.verify(token, jwt_scret_key);

    res
      .status(200)
      .json({ message: "Successfully verified!", payload: verifyToken });
  } catch (err) {
    return next(err);
  }
});

// router.get("/validateToken", (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({ status: "err", message: "No auth header" });
//   }

//   const token = authHeader.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({ status: "err", message: "Token missing" });
//   }

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
//     res.json({
//       status: "success",
//       message: "Successfully Verified",
//       data: verified
//     });
//   } catch (err) {
//     res.status(401).json({
//       status: "err",
//       message: err.message
//     });
//   }
// });
