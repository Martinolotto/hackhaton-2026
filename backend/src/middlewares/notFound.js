import { HttpError } from "./errorHandler.js";

export function notFound(request, _response, next) {
  next(new HttpError(404, "NOT_FOUND", `Ruta no encontrada: ${request.method} ${request.originalUrl}`));
}
