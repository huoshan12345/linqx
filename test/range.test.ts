import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("range", function () {
    let actual = Enumerable.range(1, 10).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 5, 3).toArray();
    deepEqual(actual, [1, 4, 7, 10, 13]);

    deepEqual(Enumerable.range(3, 4).toArray(), [3, 4, 5, 6]);
    deepEqual(Enumerable.range(-2, 4).toArray(), [-2, -1, 0, 1]);
    deepEqual(Enumerable.range(-2, 4, 2).toArray(), [-2, 0, 2, 4]);
  });
});
test('range supports negative and fractional steps', () => {
  expect(Enumerable.range(3, 3, -1).toArray()).toEqual([3, 2, 1]);
  expect(Enumerable.range(0, 3, 0.5).toArray()).toEqual([0, 0.5, 1]);
});

test('range returns an empty sequence for a non-positive count', () => {
  expect(Enumerable.range(1, 0).toArray()).toEqual([]);
  expect(Enumerable.range(1, -2).toArray()).toEqual([]);
});
