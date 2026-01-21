import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import { userRouter } from "./routes/users.mjs";
import { requestTime } from "./middleware/auth.mjs";
import { errorHandler } from "./error-handlers/error-handlers.mjs";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const hostname = "localhost";

// ------------------- VIEW SETUP ---------------

// Tell Express where the HTML template files are
app.set("views", path.join(__dirname, "views"));

// Tell Express how to read the HTML files
app.set("view engine", "ejs");

// -------------------MIDDLEWARE---------------------

// Read Json data
app.use(express.json());

// Read form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images)
app.use("/assests", express.static(path.join(__dirname, "public")));

app.use(requestTime);

// --------------------Routes---------------------

app.get("/", (req, res) => {
  res.json({
    Description:
      "Task Manager is a task management system where users can create, read, update, and delete tasks. ",
  });
});

app.use("/users", userRouter);

// --------------ERROR HANDLING-------------------
app.use(errorHandler);

// ---------------SERVER----------------
app.listen(port, () => {
  console.log(`Starting Server: http://${hostname}:${port}`);
});
