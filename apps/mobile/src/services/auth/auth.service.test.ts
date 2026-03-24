import { describe, it, expect, vi, beforeEach } from "vitest";
import { supabase } from "@/src/lib/supabase/client";
import { signInWithEmail, signUp, signOut, getSession } from "./auth.service";
import { signInDtoSchema, signUpDtoSchema } from "./auth.service.constants";
import type { Mock } from 'vitest';

vi.mock("@/src/lib/supabase/client", () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn(),
    },
  },
}));

it("signInWithEmail - invalid payload (ValidationError)", async () => {
  const result = await signInWithEmail({ email: "not-an-email", password: "short" });
  expect(result.error?.code).toBe("INVALID_INPUT");
  expect(result.error?.message).toMatch(/email must be a valid email/);
});

it("signInWithEmail - invalid payload (generic error)", async () => {
  const spy = vi.spyOn(signInDtoSchema, "validate").mockImplementation(() => {
    throw new Error("fail");
  });
  const result = await signInWithEmail({ email: "fin@enterprise.com", password: "securepass" });
  expect(result.error?.code).toBe("INVALID_INPUT");
  expect(result.error?.message).toBe("Invalid request payload.");
  spy.mockRestore();
});

it("signUp - invalid payload (ValidationError)", async () => {
  const result = await signUp({ email: "bad", password: "short" });
  expect(result.error?.code).toBe("INVALID_INPUT");
  expect(result.error?.message).toMatch(/email must be a valid email/);
});

it("signUp - invalid payload (generic error)", async () => {
  const spy = vi.spyOn(signUpDtoSchema, "validate").mockImplementation(() => {
    throw new Error("fail");
  });
  const result = await signUp({ email: "fin@enterprise.com", password: "securepass" });
  expect(result.error?.code).toBe("INVALID_INPUT");
  expect(result.error?.message).toBe("Invalid request payload.");
  spy.mockRestore();
});

it("signUp - supabase error", async () => {
  (supabase.auth.signUp as unknown as Mock).mockResolvedValue({
    data: null,
    error: { status: 422, message: "already registered" },
  });
  const result = await signUp({ email: "fin@enterprise.com", password: "securepass" });
  expect(result.error?.code).toBe("EMAIL_ALREADY_REGISTERED");
});

it("signOut - supabase error", async () => {
  (supabase.auth.signOut as unknown as Mock).mockResolvedValue({ error: { status: 500, message: "fail" } });
  const result = await signOut();
  expect(result.error?.code).toBe("UNKNOWN_AUTH_ERROR");
});

it("getSession - happy path", async () => {
  (supabase.auth.getSession as unknown as Mock).mockResolvedValue({
    data: { user: fintechUser, session: fintechSession },
    error: null,
  });
  const result = await getSession();
  expect(result.data?.user).toEqual(fintechUser);
  expect(result.error).toBeNull();
});

it("getSession - supabase error", async () => {
  (supabase.auth.getSession as unknown as Mock).mockResolvedValue({
    data: null,
    error: { status: 401, message: "Unauthorized" },
  });
  const result = await getSession();
  expect(result.error?.code).toBe("UNAUTHORIZED");
});

const fintechUser = { id: "fintech-123", email: "fin@enterprise.com" };
const fintechSession = { access_token: "token", user: fintechUser };

describe("auth.service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("signInWithEmail - happy path", async () => {
    (supabase.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
      data: { user: fintechUser, session: fintechSession },
      error: null,
    });
    const result = await signInWithEmail({ email: "fin@enterprise.com", password: "securepass" });
    expect(result.data?.user).toEqual(fintechUser);
    expect(result.error).toBeNull();
  });

  it("signInWithEmail - 401 Unauthorized", async () => {
    (supabase.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
      data: null,
      error: { status: 401, message: "Unauthorized" },
    });
    const result = await signInWithEmail({ email: "fin@enterprise.com", password: "wrongpass" });
    expect(result.error?.code).toBe("UNAUTHORIZED");
  });

  it("signInWithEmail - 500 Server Error", async () => {
    (supabase.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
      data: null,
      error: { status: 500, message: "Internal Server Error" },
    });
    const result = await signInWithEmail({ email: "fin@enterprise.com", password: "failerror" });
    expect(result.error?.code).toBe("UNKNOWN_AUTH_ERROR");
  });

  it("signInWithEmail - Network Timeout", async () => {
    (supabase.auth.signInWithPassword as unknown as Mock).mockResolvedValue({
      data: null,
      error: { status: 0, message: "Network request failed" },
    });
    const result = await signInWithEmail({ email: "fin@enterprise.com", password: "timeouted" });
    expect(result.error?.code).toBe("NETWORK_ERROR");
  });

  it("signUp - happy path", async () => {
    (supabase.auth.signUp as unknown as Mock).mockResolvedValue({
      data: { user: fintechUser, session: fintechSession },
      error: null,
    });
    const result = await signUp({ email: "fin@enterprise.com", password: "securepass" });
    expect(result.data?.user).toEqual(fintechUser);
    expect(result.error).toBeNull();
  });

  it("signOut - happy path", async () => {
    (supabase.auth.signOut as unknown as Mock).mockResolvedValue({ error: null });
    const result = await signOut();
    expect(result.data).toBe(true);
    expect(result.error).toBeNull();
  });
});
