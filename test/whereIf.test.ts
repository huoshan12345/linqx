import { describe, it, expect } from "vitest";
import { Enumerable } from "@/index.js";

describe("whereIf", () => {
  it("filters when true", () => {
    expect(
      Enumerable.from([1, 2, 3]).whereIf(true, x => x > 1).toArray()
    ).toEqual([2, 3]);
  });

  it("skips when false", () => {
    expect(
      Enumerable.from([1, 2, 3]).whereIf(false, x => x > 1).toArray()
    ).toEqual([1, 2, 3]);
  });

  it("skips when null/undefined/empty string", () => {
    expect(Enumerable.from([1]).whereIf(null, () => false).toArray()).toEqual([1]);
    expect(Enumerable.from([1]).whereIf(undefined, () => false).toArray()).toEqual([1]);
    expect(Enumerable.from([1]).whereIf("", () => false).toArray()).toEqual([1]);
  });

  it("runs when non-empty string", () => {
    expect(
      Enumerable.from([1, 2]).whereIf("x", x => x > 1).toArray()
    ).toEqual([2]);
  });

  it("works on empty sequence", () => {
    expect(
      Enumerable.from([]).whereIf(true, () => true).toArray()
    ).toEqual([]);
  });
});