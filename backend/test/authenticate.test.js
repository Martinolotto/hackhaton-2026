import assert from "node:assert/strict";
import test from "node:test";
import { createRequireAuth } from "../src/middlewares/authenticate.js";

function runMiddleware(middleware, authorization) {
  const request = {
    headers: authorization ? { authorization } : {},
    get(name) {
      return this.headers[name.toLowerCase()];
    },
  };

  return new Promise((resolve) => {
    middleware(request, {}, (error) => resolve({ error, request }));
  });
}

test("rechaza Authorization ausente sin consultar Supabase", async () => {
  let called = false;
  const middleware = createRequireAuth({
    getClaims: async () => {
      called = true;
    },
  });

  const { error } = await runMiddleware(middleware);

  assert.equal(called, false);
  assert.equal(error.status, 401);
  assert.equal(error.code, "UNAUTHORIZED");
});

test("rechaza esquemas Bearer malformados", async () => {
  const middleware = createRequireAuth({ getClaims: async () => assert.fail("No debe validar") });

  for (const authorization of ["Basic abc", "Bearer", "Bearer uno dos"]) {
    const { error } = await runMiddleware(middleware, authorization);
    assert.equal(error.status, 401);
    assert.equal(error.code, "UNAUTHORIZED");
  }
});

test("rechaza un token inválido", async () => {
  const middleware = createRequireAuth({
    getClaims: async () => ({ data: null, error: new Error("invalid") }),
  });

  const { error } = await runMiddleware(middleware, "Bearer invalid-token");

  assert.equal(error.status, 401);
  assert.equal(error.code, "UNAUTHORIZED");
});

test("rechaza un token expirado", async () => {
  const middleware = createRequireAuth({
    getClaims: async () => {
      throw new Error("token expired");
    },
  });

  const { error } = await runMiddleware(middleware, "Bearer expired-token");

  assert.equal(error.status, 401);
  assert.equal(error.code, "UNAUTHORIZED");
});

test("rechaza claims sin sub no vacío", async () => {
  const middleware = createRequireAuth({
    getClaims: async () => ({ data: { claims: { sub: "" } }, error: null }),
  });

  const { error } = await runMiddleware(middleware, "Bearer valid-shape");

  assert.equal(error.status, 401);
  assert.equal(error.code, "UNAUTHORIZED");
});

test("conserva únicamente req.auth.userId para un token válido", async () => {
  const middleware = createRequireAuth({
    getClaims: async (token) => {
      assert.equal(token, "valid-token");
      return {
        data: { claims: { sub: "user-123", email: "private@example.com", role: "authenticated" } },
        error: null,
      };
    },
  });

  const { error, request } = await runMiddleware(middleware, "Bearer valid-token");

  assert.equal(error, undefined);
  assert.deepEqual(request.auth, { userId: "user-123" });
});
