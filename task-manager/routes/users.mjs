import express from "express";
import { ApiError } from "../error-handlers/api-error.mjs";
// import { authentication } from "../middleware/auth.mjs";

export const userRouter = express.Router();

let users = [
  {
    id: 1,
    firstName: "Divine",
    lastName: "Ajaegbu",
    email: "divine@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    firstName: "John",
    lastName: "Doe",
    email: "john@gmail.com",
    role: "user",
  },
  {
    id: 3,
    firstName: "Mary",
    lastName: "Smith",
    email: "mary@gmail.com",
    role: "user",
  },
  {
    id: 4,
    firstName: "Paul",
    lastName: "Johnson",
    email: "paul@gmail.com",
    role: "user",
  },
  {
    id: 5,
    firstName: "Anna",
    lastName: "Brown",
    email: "anna@gmail.com",
    role: "manager",
  },
  {
    id: 6,
    firstName: "Peter",
    lastName: "Williams",
    email: "peter@gmail.com",
    role: "user",
  },
  {
    id: 7,
    firstName: "Grace",
    lastName: "Lee",
    email: "grace@gmail.com",
    role: "user",
  },
  {
    id: 8,
    firstName: "Daniel",
    lastName: "Kim",
    email: "daniel@gmail.com",
    role: "user",
  },
  {
    id: 9,
    firstName: "Ruth",
    lastName: "Martin",
    email: "ruth@gmail.com",
    role: "user",
  },
  {
    id: 10,
    firstName: "James",
    lastName: "Wilson",
    email: "james@gmail.com",
    role: "user",
  },
];



// userRouter.get("/", authentication, (req, res, next) => {/

userRouter.get("/", (req, res, next) => {
  const { firstName, role, email } = req.query;

  if (!users || users.length === 0) {
    return next(new ApiError("Users not found", 404));
  }

  if (firstName && email) {
    users = users.filter(
      (user) => user.firstName === firstName && user.email === email
    );
  }

  if (role) {
    users = users.filter((user) => user.role === role);
  }

  res.status(200).json(users);
});

userRouter.get("/new", (req, res) => {
  res.render("index");
});

userRouter.get("/identity", (req, res) => {
  res.render("layout", {users})
})

userRouter.get("/:userId", (req, res, next) => {
  const getUserId = Number(req.params.userId);

  if (!getUserId || isNaN(getUserId)) {
    return next(new ApiError("Something went wrong", 404));
  }

  users = users.find((user) => user.id === getUserId);

  if (!users) {
    return next(new ApiError("user does not exist", 404));
  }

  res.status(200).json(users);
});

userRouter.post("/", (req, res) => {
  const newUsers = req.body;

  console.log(newUsers);

  const userId = users.length + 1;

  const data = {
    id: userId,
    ...newUsers,
  };

  users.push(data);

  res.status(201).json(users);
  // res.redirect(303, `/users`)
  // res.redirect(`/${userId}`);
  // res.redirect(303, `/users`); // 303 for redirect-after-POST
});

userRouter.patch("/:id", (req, res, next) => {
  const id = Number(req.params.id);
  const { firstName, lastName, email, role } = req.body;

  if (!id) {
    return next(new ApiError("id is not found", 404));
  }

  if (isNaN(id)) {
    return next(new ApiError("userId is not a number", 400));
  }

  const findUser = users.find((user) => user.id === id);

  // findUser.firstName = firstName;

  // findUser.lastName = lastName;

  Object.assign(findUser, { firstName, lastName });

  if (!findUser) {
    return next(new ApiError("findUser is not found", 404));
  }

  res.status(200).json(findUser);
});

userRouter.delete("/:deleteId", (req, res, next) => {
  const deleteId = Number(req.params.deleteId);

  if (!deleteId) {
    return next(new ApiError("Something went wrong", 400));
  }

  users = users.filter((user) => user.id !== deleteId);

  res.status(200).json(users);
});
