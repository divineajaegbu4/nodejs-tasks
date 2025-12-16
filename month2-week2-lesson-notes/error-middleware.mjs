// import { ApiError } from "./api-error.mjs";

// export const errorHandling = (req, res, next) => {

//     const err = new ApiError("URL not found", 404)

//     next(err.message)
//     // res.status(404).json({
//     //     message: "Server error",
//     //     date: new Date()
//     // })
// }

export const errorHandling = (err, req, res, next) => {
    console.log("Error caught:", err.message);

    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
        date: new Date()
    });
};