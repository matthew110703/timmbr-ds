import { describe, expect, it } from "vitest";
import { buildSignInPath, safeReturnTo } from "./contract/returnTo";

describe("safeReturnTo", () => {
  it("keeps same-origin relative paths", () => {
    expect(safeReturnTo("/account/orders?page=2")).toBe("/account/orders?page=2");
  });

  it.each(["https://evil.com", "//evil.com", "/\\evil.com", "javascript:alert(1)", "account", "/a\nb"])(
    "rejects %s",
    (value) => {
      expect(safeReturnTo(value)).toBe("/");
    },
  );

  it("falls back for empty values", () => {
    expect(safeReturnTo(null, "/home")).toBe("/home");
  });
});

describe("buildSignInPath", () => {
  it("opens the modal on the shell and remembers where to go back", () => {
    expect(buildSignInPath("/account")).toBe("/?signin=1&returnTo=%2Faccount");
    expect(buildSignInPath("https://evil.com")).toBe("/?signin=1&returnTo=%2F");
  });
});
