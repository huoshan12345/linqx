import { describe, it, expect } from "vitest";
import Enumerable from "../index";

describe("position", () => {
  it("adds flags", () => {
    expect(
      Enumerable.from(["a", "b", "c"]).position().toArray()
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
});