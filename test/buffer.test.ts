import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Grouping", () => {
  test("buffer", function () {
    const actual = Enumerable.range(1, 10).buffer(3).toArray();
    const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]];
    expect(actual).toEqual(expected);
  });
});
test('buffer emits a final partial buffer', () => {
  expect(Enumerable.range(1, 5).buffer(2).toArray()).toEqual([[1, 2], [3, 4], [5]]);
});

test('buffer rejects non-positive sizes', () => {
  expect(() => Enumerable.range(1, 3).buffer(0)).toThrow(RangeError);
  expect(() => Enumerable.range(1, 3).buffer(-1)).toThrow(RangeError);
});
