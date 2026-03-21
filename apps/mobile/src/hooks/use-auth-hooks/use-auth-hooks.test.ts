import { beforeEach, describe, expect, it, vi } from "vitest";

import { signInWithPassword } from "@/src/api/services/auth.service";
import { useAuthStore } from "@/src/store/auth.store";
import { useSignInMutation } from "./use-auth-hooks";

const setSessionMock = vi.fn();

vi.mock("@/src/api/services/auth.service", () => ({
  signInWithPassword: vi.fn(),
}));

vi.mock("@/src/store/auth.store", () => ({
  useAuthStore: Object.assign(
    (selector: (state: { setSession: typeof setSessionMock }) => unknown) =>
      selector({ setSession: setSessionMock }),
    {
      setState: vi.fn(),
      getState: vi.fn(() => ({ isAuthenticated: true, session: { userId: "user-account-100" } })),
    },
  ),
}));

vi.mock("@tanstack/react-query", () => ({
  useMutation: vi.fn(
    (options: {
      mutationFn: (input: { email: string; password: string }) => Promise<unknown>;
      onSuccess?: (result: { data: unknown }) => Promise<void> | void;
    }) => ({
      mutateAsync: async (input: { email: string; password: string }) => {
        const result = await options.mutationFn(input);
        if (options.onSuccess) {
          await options.onSuccess(result as { data: unknown });
        }
        return result;
      },
    }),
  ),
}));

describe("use-auth-hooks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setSessionMock.mockResolvedValue(undefined);
  });

  it("useSignInMutation triggers service and updates store on success", async () => {
    vi.mocked(signInWithPassword).mockResolvedValue({
      data: {
        accessToken: "enterprise-access-token",
        refreshToken: "enterprise-refresh-token",
        userId: "user-account-100",
      },
      error: null,
    });

    const mutation = useSignInMutation();

    await mutation.mutateAsync({
      email: "user.account@enterprise-auth.io",
      password: "secure-password",
    });

    expect(signInWithPassword).toHaveBeenCalledWith({
      email: "user.account@enterprise-auth.io",
      password: "secure-password",
    });

    expect(setSessionMock).toHaveBeenCalledWith({
      accessToken: "enterprise-access-token",
      refreshToken: "enterprise-refresh-token",
      userId: "user-account-100",
    });

    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().session?.userId).toBe("user-account-100");
  });
});
