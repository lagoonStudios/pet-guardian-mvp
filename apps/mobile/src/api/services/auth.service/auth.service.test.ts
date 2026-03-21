import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockConfig } = vi.hoisted(() => ({
  mockConfig: {
    EXPO_PUBLIC_SUPABASE_URL: "https://saas-infrastructure-auth.test",
    EXPO_PUBLIC_SUPABASE_ANON_KEY: "saas-infrastructure-public-key",
  },
}));

vi.mock("@/src/lib/config", () => ({
  config: mockConfig,
}));

const { mockSignInWithPassword, mockGetUser } = vi.hoisted(() => ({
  mockSignInWithPassword: vi.fn(),
  mockGetUser: vi.fn(),
}));

vi.mock("@/lib/supabase", () => ({
  supabase: {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      getUser: mockGetUser,
    },
  },
}));

import { getSession, signInWithPassword } from "./auth.service";

describe("auth.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a session when enterprise auth login succeeds", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: {
        session: {
          access_token: "enterprise-access-token",
          refresh_token: "enterprise-refresh-token",
        },
        user: { id: "user-account-100" },
      },
      error: null,
    });

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
    mockSignInWithPassword.mockResolvedValue({
      data: { session: null, user: null },
      error: {
        code: "invalid_credentials",
        message: "Invalid user credentials",
      },
    });

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

  it("maps invalid_grant to invalid_credentials", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { session: null, user: null },
      error: {
        code: "invalid_grant",
        message: "Bad auth flow",
      },
    });

    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "bad-password",
    });

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "invalid_credentials",
      message: "Bad auth flow",
    });
  });

  it("maps message-based auth failure to invalid_credentials", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: { session: null, user: null },
      error: {
        code: "unknown_code",
        message: "Invalid login credentials",
      },
    });

    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "bad-password",
    });

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "invalid_credentials",
      message: "Invalid login credentials",
    });
  });

  it("returns network_error when auth sdk rejects on sign in", async () => {
    mockSignInWithPassword.mockRejectedValue(new Error("socket timeout"));

    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "secure-password",
    });

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "network_error",
      message: "Unable to reach authentication service",
    });
  });

  it("returns empty token fields when sdk session payload is missing", async () => {
    mockSignInWithPassword.mockResolvedValue({
      data: {
        session: null,
        user: null,
      },
      error: null,
    });

    const result = await signInWithPassword({
      email: "user.account@enterprise-auth.io",
      password: "secure-password",
    });

    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      accessToken: "",
      refreshToken: "",
      userId: "",
    });
  });

  it("retrieves session user profile from supabase auth endpoint", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          id: "user-account-100",
        },
      },
      error: null,
    });

    const result = await getSession("enterprise-access-token");

    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      accessToken: "enterprise-access-token",
      refreshToken: "",
      userId: "user-account-100",
    });
  });

  it("returns unknown error when getSession fails with non-network message", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: {
        code: "internal_error",
        message: "Service degraded",
      },
    });

    const result = await getSession("enterprise-access-token");

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "unknown",
      message: "Service degraded",
    });
  });

  it("returns network_error when getSession throws", async () => {
    mockGetUser.mockRejectedValue(new Error("failed to fetch"));

    const result = await getSession("enterprise-access-token");

    expect(result.data).toBeNull();
    expect(result.error).toEqual({
      code: "network_error",
      message: "Unable to retrieve session",
    });
  });

  it("returns empty userId when getSession succeeds with null user", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: null,
      },
      error: null,
    });

    const result = await getSession("enterprise-access-token");

    expect(result.error).toBeNull();
    expect(result.data).toEqual({
      accessToken: "enterprise-access-token",
      refreshToken: "",
      userId: "",
    });
  });
});
