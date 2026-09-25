import { getSupabaseClaims } from "../config/supabase.js";
import { HttpError } from "./errorHandler.js";

const unauthorized = () =>
  new HttpError(401, "UNAUTHORIZED", "Es necesario iniciar sesión nuevamente.");

export function createRequireAuth({ getClaims = getSupabaseClaims } = {}) {
  return async function requireAuth(request, _response, next) {
    const authorization = request.get("authorization");
    const match = typeof authorization === "string" ? /^Bearer ([^\s]+)$/i.exec(authorization) : null;

    if (!match) {
      next(unauthorized());
      return;
    }

    try {
      const { data, error } = await getClaims(match[1]);
      const userId = data?.claims?.sub;

      if (error || typeof userId !== "string" || userId.trim() === "") {
        next(unauthorized());
        return;
      }

      request.auth = { userId };
      next();
    } catch {
      next(unauthorized());
    }
  };
}

export const requireAuth = createRequireAuth();
