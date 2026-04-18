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

  it('should correctly return neighbors for each element', () => {
    const numbers = Enumerable.range(1, 5).toArray();
    let i = 0;
    for (const { prev, item, next } of Enumerable.from(numbers).withNeighbors()) {
      expect(prev).toBe(i > 0 ? numbers[i - 1] : null);
      expect(item).toBe(i + 1);
      expect(next).toBe(i < numbers.length - 1 ? numbers[i + 1] : null);
      i++;
    }
  });
});