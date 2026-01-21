import express from "express";
import Datastore from "nedb-promises";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JSON_SECRET_KEY } from "./config.mjs";

const app = express();

// 200 – OK
// 201 – Created
// 400 – Bad Request
// 401 – Unauthorized
// 403 – Forbidden
// 404 – Not Found
// 409 – Conflict
// 500 – Internal Server Error

// Configure body parser
app.use(express.json());

const users = Datastore.create("Users.db");

const userRefreshTokens = Datastore.create("UserRefreshTokens.db");

const userLogoutTokens = Datastore.create("userLogout.db");

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ message: "REST API Authentication and Authorization" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password || !name) {
      throw new Error("Input is required");
    }

    const removeDuplicateEmail = await users.findOne({ email });

    if (removeDuplicateEmail) {
      return res.status(409).json({ message: "Email has already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createUsers = await users.insert({
      name,
      email,
      role: role ?? "user",
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "The user has successfully created", createUsers });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await users.findOne({ email });

    if (!email || !password) {
      return res
        .status(422)
        .json("Please fill all the fields (email and password)");
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json("The user is not authorized");
    }

    const generateJwt = jwt.sign(
      { userId: user._id },
      JSON_SECRET_KEY.accessToken,
      { subject: "divine", expiresIn: JSON_SECRET_KEY.expiredToken },
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      JSON_SECRET_KEY.refreshToken,
      {
        subject: "refreshToken",
        expiresIn: JSON_SECRET_KEY.expiredRefreshToken,
      },
    );

    await userRefreshTokens.insert({
      userId: user._id,
      refreshToken,
    });

    res.status(200).json({
      name: user.name,
      email: user.email,
      generateJwt,
      refreshToken,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.post("/api/auth/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found!" });
    }

    const decoderdRefreshToken = jwt.verify(
      refreshToken,
      JSON_SECRET_KEY.refreshToken,
    );

    const userRefreshToken = userRefreshTokens.findOne({
      refreshToken,
      userId: decoderdRefreshToken.userId,
    });

    // To delete old refresh tokens
    await userRefreshTokens.remove({ id: userRefreshToken.userId });

    // To cleans DB file

    await userRefreshTokens.compactDatafile();

    const generateJwt = jwt.sign(
      { userId: decoderdRefreshToken.userId },
      JSON_SECRET_KEY.accessToken,
      { subject: "divine", expiresIn: JSON_SECRET_KEY.expiredToken },
    );

    const newRefreshToken = jwt.sign(
      { userId: decoderdRefreshToken.userId },
      JSON_SECRET_KEY.refreshToken,
      {
        subject: "refreshToken",
        expiresIn: JSON_SECRET_KEY.expiredRefreshToken,
      },
    );

    return res.status(200).json({
      generateJwt,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    // If the error is from jwt.TokenExpiredError or jwt.JsonWebTokenError
    if (
      err instanceof jwt.TokenExpiredError ||
      err instanceof jwt.JsonWebTokenError
    ) {
      return res
        .status(401)
        .json({ message: "Refresh token invalid or expired" });
    }
    return res.status(500).json(err.message);
  }
});

const ensureAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json("User not found");
  }

  console.log(token);

  // To check if the accessToken exist when logged out
  if (await userLogoutTokens.findOne({ token })) {
    return res
      .status(401)
      .json({ message: "Access token invalid", code: "AccessInvalid" });
  }

  try {
    const decodedAccessToken = jwt.verify(token, JSON_SECRET_KEY.accessToken);

    req.user = { id: decodedAccessToken.userId };
    req.accessToken = { value: token, exp: decodedAccessToken.exp };

    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res
        .status(401)
        .json({ message: "Access token expired", code: "AccessExpired" });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Access token invalid", code: "AccessInvalid" });
    } else {
      return res.status(500).json(err.message);
    }
  }
};

app.get("/api/users/verification", ensureAuthenticated, async (req, res) => {
  try {
    const user = await users.findOne({ _id: req.user.id });

    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

const authorize = (roles = []) => {
  return async function (req, res, next) {
    try {
      const user = await users.findOne({ _id: req.user.id });

      if (!user || !roles.includes(user.role)) {
        return res.status(403).json("Access denied");
      }

      next();
    } catch (err) {
      return res.status(500).json(err.message);
    }
  };
};

app.get("/api/auth/logout", ensureAuthenticated, async (req, res) => {
  try {
    // await userRefreshTokens.remove({
    //   userId: req.user.id,
    //   multi: true,
    // });

     await userRefreshTokens.removeMany({userId: req.user.id})
    await userRefreshTokens.compactDatafile();

    await userLogoutTokens.insert({
      userId: req.user.id,
      accessToken: req.accessToken.value,
      expirationTime: req.accessToken.exp,
    });

    // 204 - No content
    res.status(204).send()
  } catch (err) {
    return res.status(500).json(err.message);
  }
});

app.get("/api/admin", ensureAuthenticated, authorize(["admin"]), (req, res) => {
  return res.status(200).json("Only admins can access this token");
});

app.get(
  "/api/moderator",
  ensureAuthenticated,
  authorize(["admin", "moderator"]),
  (req, res) => {
    return res
      .status(200)
      .json("Only admins or moderator can access this token");
  },
);

app.listen(3000, () => console.log("Server is running!"));
