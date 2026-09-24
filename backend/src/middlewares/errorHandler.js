export function errorHandler(error, _request, response, _next) {
  const status = error.status ?? 500;

  response.status(status).json({
    error: status === 500 ? "Error interno del servidor." : error.message,
  });
}
