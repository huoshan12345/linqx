import { describe, expect, it } from "vitest";
import Enumerable from "./sut.js";

describe("position", () => {
  it("adds flags", () => {
    const positioned: Enumerable.Positioned<string>[] =
      Enumerable.from(["a", "b", "c"]).position().toArray();

    expect(
      positioned
    ).toEqual([
      { index: 0, item: "a", isFirst: true, isLast: false },
      { index: 1, item: "b", isFirst: false, isLast: false },
      { index: 2, item: "c", isFirst: false, isLast: true }
    ]);
  });

  it("single item", () => {
    expect(
      Enumerable.from(["x"]).position().toArray()
    ).toEqual([
      { index: 0, item: "x", isFirst: true, isLast: true }
    ]);
  });

  it("empty sequence", () => {
    expect(
      Enumerable.from([]).position().toArray()
    ).toEqual([]);
  });

  it("for of loop", () => {
    for (const { index, item, isFirst, isLast } of Enumerable.from(["a", "b", "c"]).position()) {
      switch (index) {
        case 0:
          expect(item).toBe("a");
          expect(isFirst).toBe(true);
          expect(isLast).toBe(false);
          break;
        case 1:
          expect(item).toBe("b");
          expect(isFirst).toBe(false);
          expect(isLast).toBe(false);
          break;
        case 2:
          expect(item).toBe("c");
          expect(isFirst).toBe(false);
          expect(isLast).toBe(true);
          break;
      }
    }
  });
});
