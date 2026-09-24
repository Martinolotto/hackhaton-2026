export function notFound(request, _response, next) {
  const error = new Error(`Ruta no encontrada: ${request.method} ${request.originalUrl}`);
  error.status = 404;
  next(error);
}
