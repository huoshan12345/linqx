import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Iterator", () => {
  test("for..of", function () {
    const actual: number[] = [];
    for (const a of Enumerable.from([1, 2, 3])) {
      actual.push(a);
    }
    deepEqual(actual, [1, 2, 3]);
  });

  test("Symbol.iterator", function () {
    const actual = [1, 2, 3, 4];
    const expected = Array.from(Enumerable.from(actual));
    deepEqual(actual, expected);
    const actual2 = actual.map(function (x) { return x * 2; }); // [2,4,6,8];
    const selected = Enumerable.from(actual).select(function (x) { return x * 2; });
    deepEqual(actual2, Array.from(selected));
  });

  test("reusable iterator", function () {
    const set = new Set([1, 2, 3]);

    const a = Enumerable.from(set.entries());

    deepEqual(a.toArray(), [[1, 1], [2, 2], [3, 3]]);
    deepEqual(a.toArray(), []);

    const b = Enumerable.from(() => set.entries());

    deepEqual(b.toArray(), [[1, 1], [2, 2], [3, 3]]);
    deepEqual(b.toArray(), [[1, 1], [2, 2], [3, 3]]);

    const c = Enumerable.from(() => ['x', 'y', 'z']);

    deepEqual(c.toArray(), ['x', 'y', 'z']);
    deepEqual(c.toArray(), ['x', 'y', 'z']);
  });
});
