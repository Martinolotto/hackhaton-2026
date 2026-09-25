export class HttpError extends Error {
  constructor(status, code, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.code = code;
  }
}

function normalizeError(error) {
  if (error?.type === "entity.too.large") {
    return new HttpError(413, "PAYLOAD_TOO_LARGE", "La solicitud supera el tamaño permitido.");
  }

  if (error instanceof SyntaxError && "body" in error) {
    return new HttpError(400, "INVALID_REQUEST", "La solicitud de evaluación no es válida.");
  }

  if (error instanceof HttpError) {
    return error;
  }

  return new HttpError(500, "INTERNAL_ERROR", "Ocurrió un error interno.");
}

export function errorHandler(error, _request, response, _next) {
  const normalized = normalizeError(error);

  response.status(normalized.status).json({
    error: {
      code: normalized.code,
      message: normalized.message,
    },
  });
}
