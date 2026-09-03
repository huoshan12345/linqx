import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("range", function () {
    let actual = Enumerable.range(1, 10).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 5, 3).toArray();
    expect(actual).toEqual([1, 4, 7, 10, 13]);

    expect(Enumerable.range(3, 4).toArray()).toEqual([3, 4, 5, 6]);
    expect(Enumerable.range(-2, 4).toArray()).toEqual([-2, -1, 0, 1]);
    expect(Enumerable.range(-2, 4, 2).toArray()).toEqual([-2, 0, 2, 4]);
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
