import { ApiError } from "@timmbr/utils";
import { describe, expect, it } from "vitest";
import { DEFAULT_AUTH_MESSAGES } from "./messages";
import { authErrorMessage } from "./errors";

const apiError = (status: number, code?: string, body: Record<string, unknown> = {}) =>
  new ApiError(status, "server text", { code, ...body }, code);

describe("authErrorMessage", () => {
  it("tells admin accounts to use their password (OTP refused)", () => {
    expect(authErrorMessage(apiError(403, "OTP_NOT_ALLOWED"))).toBe(DEFAULT_AUTH_MESSAGES.errors.OTP_NOT_ALLOWED);
  });

  it("maps known codes to copy", () => {
    expect(authErrorMessage(apiError(401, "INVALID_CREDENTIALS"))).toBe(
      DEFAULT_AUTH_MESSAGES.errors.INVALID_CREDENTIALS,
    );
  });

  it("includes attempts left for a wrong code", () => {
    expect(authErrorMessage(apiError(401, "OTP_INVALID", { details: { attemptsLeft: 2 } }))).toBe(
      "Incorrect code. 2 attempts left.",
    );
  });

  it("includes the wait time for a cooldown", () => {
    expect(authErrorMessage(apiError(429, "OTP_COOLDOWN", { details: { retryAfter: 42 } }))).toBe(
      "Please wait 42s before requesting another code.",
    );
  });

  it("maps the per-IP rate limit with its wait time", () => {
    expect(authErrorMessage(apiError(429, "RATE_LIMITED", { details: { retryAfter: 30 } }))).toBe(
      "Too many attempts. Please try again in 30s.",
    );
  });

  it("maps a bare TOO_MANY_REQUESTS (no wait time) to the rate-limit copy", () => {
    expect(authErrorMessage(apiError(429, "TOO_MANY_REQUESTS"))).toBe(
      "Too many attempts. Please wait a moment and try again.",
    );
  });

  it("surfaces the first validation message (e.g. password policy)", () => {
    expect(
      authErrorMessage(apiError(400, "BAD_REQUEST", { errors: [{ message: "Password too weak" }] })),
    ).toBe("Password too weak");
  });

  it("handles network and unknown errors", () => {
    expect(authErrorMessage(new ApiError(0, "Network error"))).toBe(DEFAULT_AUTH_MESSAGES.errors.NETWORK);
    expect(authErrorMessage(new Error("boom"))).toBe(DEFAULT_AUTH_MESSAGES.errors.GENERIC);
  });
});
