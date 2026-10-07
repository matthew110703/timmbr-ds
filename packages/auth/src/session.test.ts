import { ApiError } from "@timmbr/utils";
import { beforeEach, describe, expect, it, vi } from "vitest";

const authApiMock = vi.hoisted(() => ({ session: vi.fn(), logout: vi.fn() }));
vi.mock("./api", () => ({ authApi: authApiMock }));

import {
  clearSession,
  getFirstName,
  getSession,
  loadSession,
  logout,
  setSignedIn,
} from "./session";

const user = { id: "u1", name: "Daenerys Targaryen", email: "dany@example.com", role: "USER" };

describe("getFirstName", () => {
  it("returns the first word of the name", () => {
    expect(getFirstName({ name: "  Daenerys   Targaryen " })).toBe("Daenerys");
  });

  it("returns null for empty names and the phone-signup placeholder", () => {
    expect(getFirstName({ name: "" })).toBeNull();
    expect(getFirstName({ name: "Customer" })).toBeNull();
    expect(getFirstName(null)).toBeNull();
  });
});

describe("session store", () => {
  beforeEach(() => {
    authApiMock.session.mockReset();
    authApiMock.logout.mockReset();
    clearSession();
  });

  it("never holds a token: only the user from the BFF", async () => {
    authApiMock.session.mockResolvedValue({ user });

    const result = await loadSession();

    expect(result).toEqual({ status: "authenticated", user });
    expect(JSON.stringify(getSession())).not.toMatch(/token/i);
  });

  it("is anonymous when the BFF reports no user", async () => {
    authApiMock.session.mockResolvedValue({ user: null });

    await expect(loadSession()).resolves.toEqual({ status: "anonymous", user: null });
  });

  it("shares one request between concurrent loads", async () => {
    authApiMock.session.mockResolvedValue({ user });

    await Promise.all([loadSession(), loadSession()]);

    expect(authApiMock.session).toHaveBeenCalledTimes(1);
  });

  it("setSignedIn updates the store immediately (cookies already set by the BFF)", () => {
    setSignedIn(user);
    expect(getSession()).toEqual({ status: "authenticated", user });
  });

  it("logout clears local state even if the BFF call fails", async () => {
    setSignedIn(user);
    authApiMock.logout.mockRejectedValue(new ApiError(0, "offline"));

    await expect(logout()).rejects.toThrow();

    expect(authApiMock.logout).toHaveBeenCalled();
    expect(getSession().status).toBe("anonymous");
  });
});
