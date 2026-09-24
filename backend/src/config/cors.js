import { env } from "./env.js";

export const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error("Origen no permitido por CORS."));
  },
};
