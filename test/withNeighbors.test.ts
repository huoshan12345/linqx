import { describe, it, expect } from "vitest";
import Enumerable from "../index";

describe("withNeighbors", () => {
  it("adds neighbors", () => {
    expect(
      Enumerable.from([10, 20, 30]).withNeighbors().toArray()
    ).toEqual([
      { prev: null, item: 10, next: 20 },
      { prev: 10, item: 20, next: 30 },
      { prev: 20, item: 30, next: null }
    ]);
  });

  it("single item", () => {
    expect(
      Enumerable.from([5]).withNeighbors().toArray()
    ).toEqual([
      { prev: null, item: 5, next: null }
    ]);
  });

  it("empty sequence", () => {
    expect(
      Enumerable.from([]).withNeighbors().toArray()
    ).toEqual([]);
  });
});