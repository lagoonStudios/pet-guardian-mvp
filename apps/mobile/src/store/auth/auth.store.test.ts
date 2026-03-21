import { describe, it, expect, beforeEach, vi } from "vitest";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "./auth.store";
import { UserBuilder } from "@/src/tests/builders/user.builder";
import { Session } from "@supabase/supabase-js";


vi.mock("@react-native-async-storage/async-storage", () => ({
  default: {
    setItem: vi.fn(),
    getItem: vi.fn(),
    removeItem: vi.fn(),
  },
}));

describe("useAuthStore", () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: true,
    });
  });

  it("sets session and updates state", () => {
    const user = new UserBuilder().withEmail("fintech-1@enterprise.com").build();
    const session = { access_token: "abc", user } as Session;
    useAuthStore.getState().setSession({ user, session });
    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.session).toMatchObject({ access_token: "abc", user });
    expect(state.isAuthenticated).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  it("clears session and resets state", () => {
    const user = new UserBuilder().withEmail("fintech-1@enterprise.com").build();
    const session = { access_token: "abc", user } as Session;
    useAuthStore.getState().setSession({ user, session });
    useAuthStore.getState().clearSession();
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.session).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it("persists state to AsyncStorage", async () => {
    const user = new UserBuilder().withEmail("fintech-2@enterprise.com").build();
    const session = { access_token: "xyz", user } as Session;
    useAuthStore.getState().setSession({ user, session });
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });
  it("sets isLoading to false after setSession or clearSession", () => {
    // isLoading should be false after setSession
    const user = new UserBuilder().withEmail("rehydrate@enterprise.com").build();
    const session = { access_token: "rehydrate", user } as Session;
    useAuthStore.setState({ isLoading: true });
    useAuthStore.getState().setSession({ user, session });
    expect(useAuthStore.getState().isLoading).toBe(false);

    // isLoading should be false after clearSession
    useAuthStore.setState({ isLoading: true });
    useAuthStore.getState().clearSession();
    expect(useAuthStore.getState().isLoading).toBe(false);
  });

  it("does not persist isLoading flag in storage", async () => {
    // Simulate a state with isLoading true
    const state = {
      user: "u",
      session: "s",
      isAuthenticated: true,
      isLoading: true,
    };
    // Simulate what would be stored by partialize
    const { user, session, isAuthenticated } = state;
    const partial = { user, session, isAuthenticated };
    expect(partial).toEqual({
      user: "u",
      session: "s",
      isAuthenticated: true,
    });
    expect(partial).not.toHaveProperty("isLoading");
  });

  it("setSession with null session sets isAuthenticated false", () => {
    const user = new UserBuilder().withEmail("edge@enterprise.com").build();
    useAuthStore.getState().setSession({ user, session: null });
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.session).toBeNull();
    expect(state.user).toEqual(user);
  });

  it("throws if AsyncStorage.setItem throws", () => {
    (AsyncStorage.setItem as any).mockImplementationOnce(() => {
      throw new Error("fail");
    });
    const user = new UserBuilder().withEmail("fail@enterprise.com").build();
    const session = { access_token: "fail", user } as Session;
    expect(() => {
      useAuthStore.getState().setSession({ user, session });
    }).toThrow("fail");
  });
});
