import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sessionMock = vi.hoisted(() => ({ status: "anonymous" as string }));
vi.mock("./session", () => ({ useSession: () => ({ status: sessionMock.status, user: null }) }));

import {
  __resetCartCountForTests,
  bumpCartCount,
  getCartCount,
  getCartQuantity,
  loadCartCount,
  setCartCount,
  setCartLines,
  useCartCount,
  useCartQuantity,
} from "./cart-count";

const respond = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("cart count store", () => {
  beforeEach(() => {
    __resetCartCountForTests();
    sessionMock.status = "anonymous";
  });
  afterEach(() => vi.unstubAllGlobals());

  it("loads the count from the shell's core proxy (one request for concurrent callers)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(respond({ success: true, data: { count: 3 } }));
    vi.stubGlobal("fetch", fetchMock);

    await Promise.all([loadCartCount(), loadCartCount()]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(String(fetchMock.mock.calls[0][0])).toContain("/api/core/cart/count");
    expect(getCartCount()).toBe(3);
  });

  it("keeps the last count when the request fails", async () => {
    setCartCount(2);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    await loadCartCount();
    expect(getCartCount()).toBe(2);
  });

  it("bumps optimistically and never goes below zero", () => {
    setCartCount(1);
    bumpCartCount(2);
    expect(getCartCount()).toBe(3);
    bumpCartCount(-10);
    expect(getCartCount()).toBe(0);
  });

  it("useCartCount loads once the session is known and re-renders on changes", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(respond({ success: true, data: { count: 4 } })));
    const { result } = renderHook(() => useCartCount());

    await waitFor(() => expect(result.current).toBe(4));
    act(() => setCartCount(5));
    expect(result.current).toBe(5);
  });

  it("drops a load answer that arrives after a newer update", async () => {
    let answer: (response: Response) => void = () => undefined;
    vi.stubGlobal("fetch", vi.fn(() => new Promise<Response>((resolve) => (answer = resolve))));

    const loading = loadCartCount();
    setCartCount(3); // e.g. an add to cart answered first
    answer(respond({ success: true, data: { count: 2 } }));
    await loading;

    expect(getCartCount()).toBe(3);
  });

  it("loads once per page, not once per component", async () => {
    const fetchMock = vi.fn().mockResolvedValue(respond({ success: true, data: { count: 1 } }));
    vi.stubGlobal("fetch", fetchMock);

    const first = renderHook(() => useCartCount());
    await waitFor(() => expect(first.result.current).toBe(1));
    renderHook(() => useCartQuantity("v1"));
    renderHook(() => useCartCount());

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("waits while the session is still loading", () => {
    sessionMock.status = "loading";
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const { result } = renderHook(() => useCartCount());
    expect(result.current).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("cart lines", () => {
  beforeEach(() => {
    __resetCartCountForTests();
    sessionMock.status = "anonymous";
  });
  afterEach(() => vi.unstubAllGlobals());

  it("knows how many of each variant are in the cart", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        respond({
          success: true,
          data: { count: 3, items: [{ variantId: "v1", quantity: 2 }, { variantId: "v2", quantity: 1 }] },
        }),
      ),
    );
    const { result } = renderHook(() => useCartQuantity("v1"));
    await waitFor(() => expect(result.current).toBe(2));
    expect(getCartCount()).toBe(3);
    expect(getCartQuantity("v3")).toBe(0);
  });

  it("replaces the lines from a cart answer, keeping the count in step", () => {
    setCartLines([
      { variantId: "v1", quantity: 1 },
      { variantId: "v1", quantity: 2 },
    ]);
    expect(getCartQuantity("v1")).toBe(3);
    expect(getCartCount()).toBe(3);
  });
});
