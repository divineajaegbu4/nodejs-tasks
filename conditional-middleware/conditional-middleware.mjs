const conditionalMiddleware = (middleware) => {
  return function (req, res, next) {
    if (res.query.admin === "true") {
      return middleware(req, res, next);
    }
  };
};

const getMiddleware = (req, res, next) => {
  console.log("It is true");
  next();
};

export { conditionalMiddleware, getMiddleware };
