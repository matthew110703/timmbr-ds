import { act, renderHook } from "@testing-library/react";
import { ApiError } from "@timmbr/utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const authApi = vi.hoisted(() => ({
  sendOtp: vi.fn(),
  verifyOtp: vi.fn(),
  login: vi.fn(),
  setPassword: vi.fn(),
  oauthStartUrl: (provider: string) => `/api/auth/oauth/start?provider=${provider}`,
}));
const session = vi.hoisted(() => ({
  setSignedIn: vi.fn(),
  broadcastAuth: vi.fn(),
  loadSession: vi.fn(),
}));

vi.mock("./api", () => ({ authApi }));
vi.mock("./session", () => session);

import { useAuthFlow } from "./useAuthFlow";
import { DEFAULT_AUTH_MESSAGES } from "./messages";

const MESSAGES = {
  ...DEFAULT_AUTH_MESSAGES,
  oauthCallback: { ...DEFAULT_AUTH_MESSAGES.oauthCallback, popupBlocked: "Allow pop-ups", popupError: "Google failed" },
};
const SENT = { destination: "d**y@example.com", codeLength: 6, expiresIn: 600, resendAvailableIn: 60 };
const USER = { id: "u1", name: "Dany", email: "dany@example.com", role: "USER" };
/** What the BFF returns after a sign-in step: the user, never tokens. */
const SIGNED_IN = { user: USER };

function setup() {
  const onSuccess = vi.fn();
  const onClose = vi.fn();
  const hook = renderHook(() => useAuthFlow({ onSuccess, onClose, messages: MESSAGES }));
  return { ...hook, onSuccess, onClose };
}

/** Type an identifier and request a code. */
async function toOtpStep(result: ReturnType<typeof setup>["result"]) {
  act(() => result.current.setIdentifier("dany@example.com"));
  await act(() => result.current.handleIdentifierSubmit());
}

describe("useAuthFlow", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    authApi.sendOtp.mockResolvedValue(SENT);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.resetAllMocks();
  });

  it("sends a code and uses the server's timing for the resend countdown", async () => {
    const { result } = setup();

    await toOtpStep(result);

    expect(authApi.sendOtp).toHaveBeenCalledWith("dany@example.com");
    expect(result.current.step).toBe("OTP");
    expect(result.current.destination).toBe(SENT.destination);
    expect(result.current.resendCountdown).toBe(60);
  });

  it("goes to the OTP step on cooldown (a recent code is still valid)", async () => {
    authApi.sendOtp.mockRejectedValue(
      new ApiError(429, "wait", { details: { retryAfter: 42 } }, "OTP_COOLDOWN"),
    );
    const { result } = setup();

    await toOtpStep(result);

    expect(result.current.step).toBe("OTP");
    expect(result.current.resendCountdown).toBe(42);
    expect(result.current.error).toBeNull();
  });

  it("existing user: OTP → SUCCESS → closes after the delay", async () => {
    authApi.verifyOtp.mockResolvedValue({ ...SIGNED_IN, isNewUser: false, hasPassword: true });
    const { result, onSuccess, onClose } = setup();

    await toOtpStep(result);
    act(() => result.current.setOtp("123456"));
    await act(() => result.current.handleOtpSubmit());

    expect(authApi.verifyOtp).toHaveBeenCalledWith("dany@example.com", "123456", "login");
    expect(session.setSignedIn).toHaveBeenCalledWith(USER);
    expect(session.broadcastAuth).toHaveBeenCalledWith({ type: "LOGIN" });
    expect(result.current.step).toBe("SUCCESS");

    await act(() => vi.advanceTimersByTimeAsync(1200));
    expect(onSuccess).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
    expect(result.current.step).toBe("IDENTIFIER");
  });

  it("new user: OTP → optional SET_PASSWORD (create) → skip → SUCCESS", async () => {
    authApi.verifyOtp.mockResolvedValue({
      ...SIGNED_IN,
      isNewUser: true,
      hasPassword: false,
      passwordSetupToken: "setup",
    });
    const { result } = setup();

    await toOtpStep(result);
    act(() => result.current.setOtp("123456"));
    await act(() => result.current.handleOtpSubmit());

    expect(result.current.step).toBe("SET_PASSWORD");
    expect(result.current.setPasswordMode).toBe("create");

    act(() => result.current.handleSkipSetPassword());
    expect(result.current.step).toBe("SUCCESS");
  });

  it("forgot password: PASSWORD → OTP (reset) → SET_PASSWORD (reset) → save", async () => {
    authApi.verifyOtp.mockResolvedValue({
      ...SIGNED_IN,
      hasPassword: true,
      passwordSetupToken: "setup",
    });
    authApi.setPassword.mockResolvedValue({ ...SIGNED_IN, hasPassword: true });
    const { result } = setup();

    act(() => result.current.setIdentifier("dany@example.com"));
    act(() => result.current.handleUsePassword());
    expect(result.current.step).toBe("PASSWORD");

    await act(() => result.current.handleForgotPassword());
    expect(result.current.step).toBe("OTP");

    act(() => result.current.setOtp("123456"));
    await act(() => result.current.handleOtpSubmit());
    expect(authApi.verifyOtp).toHaveBeenCalledWith("dany@example.com", "123456", "reset");
    expect(result.current.step).toBe("SET_PASSWORD");
    expect(result.current.setPasswordMode).toBe("reset");

    act(() => {
      result.current.setNewPassword("Str0ng!pw");
      result.current.setConfirmPassword("Str0ng!pw");
    });
    await act(() => result.current.handleSetPasswordSubmit());

    expect(authApi.setPassword).toHaveBeenCalledWith("setup", "Str0ng!pw");
    expect(session.setSignedIn).toHaveBeenLastCalledWith(USER);
    expect(result.current.step).toBe("SUCCESS");
  });

  it("password sign-in shows mapped errors", async () => {
    authApi.login.mockRejectedValue(new ApiError(401, "x", {}, "INVALID_CREDENTIALS"));
    const { result } = setup();

    act(() => result.current.setIdentifier("dany@example.com"));
    act(() => result.current.handleUsePassword());
    act(() => result.current.setPassword("wrong"));
    await act(() => result.current.handlePasswordSubmit());

    expect(result.current.step).toBe("PASSWORD");
    expect(result.current.error).toBe("Incorrect email/phone or password.");
  });

  it("ignores the UI outcome of a verify that lands after the modal was reset", async () => {
    let resolveVerify!: (v: unknown) => void;
    authApi.verifyOtp.mockReturnValue(new Promise((r) => (resolveVerify = r)));
    const { result } = setup();

    await toOtpStep(result);
    act(() => result.current.setOtp("123456"));
    let pending!: Promise<unknown>;
    act(() => {
      pending = Promise.resolve(result.current.handleOtpSubmit());
    });
    act(() => result.current.reset());
    await act(async () => {
      resolveVerify({ ...SIGNED_IN, hasPassword: true });
      await pending;
    });

    // Still signed in (the code was valid), but the closed modal didn't move on.
    expect(session.setSignedIn).toHaveBeenCalledWith(USER);
    expect(result.current.step).toBe("IDENTIFIER");
  });

  it("reports a blocked popup", () => {
    vi.spyOn(window, "open").mockReturnValue(null);
    const { result } = setup();

    act(() => result.current.startOAuthFlow("google"));

    expect(result.current.error).toBe("Allow pop-ups");
  });
});
