const requestTime = (req, res, next) => {
  console.log(`This request was made at: ${Date.now()}`);

  next()
}

// const authentication = (req, res, next) => {
//   const token = req.headers.authentication;

//   if(!token) {
//     console.log("Hi");
//     return res.status(401).json({message: "Not authorized"})
//   }

//   next()
// }


export {requestTime}
