// src/middlewares/errorHandler.js
export function  errorHandler(err, _req, res, _next) {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || 'Something went wrong',
    ...(err.meta && { errors: err.meta }),
  });
}
