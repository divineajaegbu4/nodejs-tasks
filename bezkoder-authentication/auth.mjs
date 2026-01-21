import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const router = express.Router();

dotenv.config();

router.post("/signup", (req, res) => {
  const { email, role, username, password } = req.body;

  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  const data = {
    email,
    role,
    username,
    password,
  };

  if (!data) {
    return res.status(400).json({ message: "Bad request" });
  }

  res.status(201).json({ message: "Registered successfully!" });
});

router.post("/signin", (req, res) => {
  const { password, username } = req.body;
  const secretKey = process.env.JWT_SECRET_KEY;

  if (!secretKey) {
    return res.status(404).json({ message: "Secret key not found" });
  }

  const data = {
    password,
    username,
  };

  const token = jwt.sign(data, secretKey);

  if (!token) {
    return res.status(401).json({ message: "User not found" });
  }

  res.status(200).json({ token, data });
});

router.get("/verify", (req, res) => {
  const secretKey = process.env.JWT_SECRET_KEY;
  //   const authHeader = req.headers.authorization;
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  const token = authHeader.split(" ")[1];

  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const verified = jwt.verify(token, secretKey);

    if (!verified) {
      return res.status(401).json({ message: "User unauthenticated" });
    }

  res.status(200).json({ message: "User authentication", verified });
});
