import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const { mockConfig } = vi.hoisted(() => ({
  mockConfig: {
    EXPO_PUBLIC_SUPABASE_URL: "https://saas-infrastructure-auth.test",
    EXPO_PUBLIC_SUPABASE_ANON_KEY: "saas-infrastructure-public-key",
  },
}));

vi.mock("@/src/lib/config", () => ({
  config: mockConfig,
}));

import { getSession, signInWithPassword, SUPABASE_URL } from "./auth.service";

const server = setupServer(
  http.post(`${SUPABASE_URL}/auth/v1/token`, async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };

    if (body.email === "user.account@enterprise-auth.io" && body.password === "secure-password") {
      return HttpResponse.json({
        access_token: "enterprise-access-token",
        refresh_token: "enterprise-refresh-token",
        user: { id: "user-account-100" },
      });
    }

    return HttpResponse.json(
      {
        error_code: "invalid_grant",
        msg: "Invalid user credentials",
      },
      { status: 400 },
    );
  }),
  http.get(`${SUPABASE_URL}/auth/v1/user`, () => {
    return HttpResponse.json({
      id: "user-account-100",
    });
  }),
);

describe("auth.service", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("returns a session when enterprise auth login succeeds", async () => {
    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "secure-password",
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      accessToken: "enterprise-access-token",
      refreshToken: "enterprise-refresh-token",
      userId: "user-account-100",
    });
  });

  it("returns invalid_credentials on failed login", async () => {
    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "bad-password",
    });

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "invalid_credentials",
      message: "Invalid user credentials",
    });
  });

  it("retrieves session user profile from supabase auth endpoint", async () => {
    const result = await getSession("enterprise-access-token");

    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      accessToken: "enterprise-access-token",
      refreshToken: "",
      userId: "user-account-100",
    });
  });
});
