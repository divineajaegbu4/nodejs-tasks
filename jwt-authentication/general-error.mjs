export const globalError = (err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal error"

    const errorData = {
        status: "err",
        stack: err.stack,
        message,
        statusCode
    }

   res.status(statusCode).json(errorData)
}