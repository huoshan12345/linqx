import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("rangeDown", function () {
    let actual = Enumerable.rangeDown(1, 10).toArray();
    expect(actual).toEqual([1, 0, -1, -2, -3, -4, -5, -6, -7, -8]);
    actual = Enumerable.rangeDown(1, 5, 3).toArray();
    expect(actual).toEqual([1, -2, -5, -8, -11]);

    expect(Enumerable.rangeDown(3, 5).toArray()).toEqual([3, 2, 1, 0, -1]);
    expect(Enumerable.rangeDown(-2, 4).toArray()).toEqual([-2, -3, -4, -5]);
    expect(Enumerable.rangeDown(-2, 4, 2).toArray()).toEqual([-2, -4, -6, -8]);
  });
});
test('rangeDown always moves downward using the absolute step', () => {
  expect(Enumerable.rangeDown(5, 3, -2).toArray()).toEqual([5, 3, 1]);
});

test('rangeDown returns an empty sequence for a non-positive count', () => {
  expect(Enumerable.rangeDown(5, 0).toArray()).toEqual([]);
  expect(Enumerable.rangeDown(5, -1).toArray()).toEqual([]);
});
