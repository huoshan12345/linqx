import { describe, it, expect } from "vitest";
import Enumerable from "./sut.js";

describe("toMap", () => {
  it("creates map", () => {
    const map = Enumerable.from(["a", "bb"])
      .toMap(x => x, x => x.length);

    expect(map.get("a")).toBe(1);
    expect(map.get("bb")).toBe(2);
  });

  it("returns empty map for empty sequence", () => {
    const map = Enumerable.from([]).toMap(x => x, x => x);
    expect(map.size).toBe(0);
  });

  it("last duplicate key wins", () => {
    let i = 0;
    const map = Enumerable.from(["a", "a"])
      .toMap(x => x, _ => i++);

    expect(map.get("a")).toBe(1);
  });
});