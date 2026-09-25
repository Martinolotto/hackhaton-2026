import multer from "multer";
import { HttpError } from "./errorHandler.js";

export const MAX_EVALUATION_IMAGE_BYTES = 4 * 1024 * 1024;
export const EVALUATION_IMAGE_MIME_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
]);

const invalidImage = () =>
  new HttpError(
    400,
    "INVALID_REQUEST",
    "La imagen debe ser PNG, JPEG o WEBP y respetar el formato declarado.",
  );

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_EVALUATION_IMAGE_BYTES,
    files: 1,
    fields: 1,
    parts: 2,
    fieldSize: 32 * 1024,
  },
  fileFilter(_request, file, callback) {
    if (!EVALUATION_IMAGE_MIME_TYPES.has(file.mimetype)) {
      callback(invalidImage());
      return;
    }

    callback(null, true);
  },
}).single("image");

function hasExpectedSignature(buffer, mimeType) {
  if (mimeType === "image/png") {
    return (
      buffer.length >= 8 &&
      buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
    );
  }

  if (mimeType === "image/jpeg") {
    return buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (mimeType === "image/webp") {
    return (
      buffer.length >= 12 &&
      buffer.toString("ascii", 0, 4) === "RIFF" &&
      buffer.toString("ascii", 8, 12) === "WEBP"
    );
  }

  return false;
}

function parseMultipartEvaluation(request, next) {
  if (typeof request.body.evaluation !== "string") {
    next(new HttpError(400, "INVALID_REQUEST", "La solicitud de evaluación no es válida."));
    return;
  }

  try {
    request.body = JSON.parse(request.body.evaluation);
  } catch {
    next(new HttpError(400, "INVALID_REQUEST", "La solicitud de evaluación no es válida."));
    return;
  }

  if (request.file) {
    if (!hasExpectedSignature(request.file.buffer, request.file.mimetype)) {
      next(invalidImage());
      return;
    }

    request.evaluationImage = {
      buffer: request.file.buffer,
      mimeType: request.file.mimetype,
    };
  }

  next();
}

export function parseEvaluationInput(request, response, next) {
  if (!request.is("multipart/form-data")) {
    next();
    return;
  }

  upload(request, response, (error) => {
    if (error) {
      next(error);
      return;
    }

    parseMultipartEvaluation(request, next);
  });
}
