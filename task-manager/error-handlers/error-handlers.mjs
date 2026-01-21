export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500

    res.status(statusCode).json({
        status: "err",
        name: err.name,
        stack: err.stack,
        message: err.message || "Something went wrong!",
        statusCode: err.statusCode,
        isOperational: err.isOperational
    })
}