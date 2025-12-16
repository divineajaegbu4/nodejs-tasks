const middleware1 = (req, res, next) => {
  // Modify req
  req.user = {
    name: "Divine",
    age: 40,
    religion: "Christian",
  };

  next();
};

const middleware2 = (req, res, next) => {
  // Use the modification
  console.log(req.user.age);
  next();
};

const middleware3 = (req, res, next) => {
  req.output = {
    name: "Gideon",
    user: req.user,
  };
  next();
};

export { middleware1, middleware2, middleware3 };
