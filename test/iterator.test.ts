import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Iterator", () => {
  test("for..of", function () {
    const actual: number[] = [];
    for (const a of Enumerable.from([1, 2, 3])) {
      actual.push(a);
    }
    expect(actual).toEqual([1, 2, 3]);
  });

  test("Symbol.iterator", function () {
    const actual = [1, 2, 3, 4];
    const expected = Array.from(Enumerable.from(actual));
    expect(actual).toEqual(expected);
    const actual2 = actual.map(function (x) { return x * 2; }); // [2,4,6,8];
    const selected = Enumerable.from(actual).select(function (x) { return x * 2; });
    expect(actual2).toEqual(Array.from(selected));
  });

  test("reusable iterator", function () {
    const set = new Set([1, 2, 3]);

    const a = Enumerable.from(set.entries());

    expect(a.toArray()).toEqual([[1, 1], [2, 2], [3, 3]]);
    expect(a.toArray()).toEqual([]);

    const b = Enumerable.from(() => set.entries());

    expect(b.toArray()).toEqual([[1, 1], [2, 2], [3, 3]]);
    expect(b.toArray()).toEqual([[1, 1], [2, 2], [3, 3]]);

    const c = Enumerable.from(() => ['x', 'y', 'z']);

    expect(c.toArray()).toEqual(['x', 'y', 'z']);
    expect(c.toArray()).toEqual(['x', 'y', 'z']);
  });
});
