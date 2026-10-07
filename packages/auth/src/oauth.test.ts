import { describe, expect, it } from "vitest";
import { isOAuthResultMessage, OAUTH_RESULT_MESSAGE } from "./contract/oauth";

describe("isOAuthResultMessage", () => {
  it("accepts well-formed success and error results", () => {
    expect(isOAuthResultMessage({ type: OAUTH_RESULT_MESSAGE, status: "success" })).toBe(true);
    expect(isOAuthResultMessage({ type: OAUTH_RESULT_MESSAGE, status: "error" })).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isOAuthResultMessage(null)).toBe(false);
    expect(isOAuthResultMessage("AUTH_SUCCESS")).toBe(false);
    expect(isOAuthResultMessage({ type: "AUTH_SUCCESS" })).toBe(false);
    expect(isOAuthResultMessage({ type: OAUTH_RESULT_MESSAGE, status: "maybe" })).toBe(false);
  });
});
