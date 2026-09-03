import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("toNegativeInfinity", function () {
    let actual = Enumerable.toNegativeInfinity().where((i) => i % 2 === 0).take(10).toArray();
    expect(actual).toEqual([0, -2, -4, -6, -8, -10, -12, -14, -16, -18]);
    actual = Enumerable.toNegativeInfinity(3).take(10).toArray();
    expect(actual).toEqual([3, 2, 1, 0, -1, -2, -3, -4, -5, -6]);
    actual = Enumerable.toNegativeInfinity(3, 5).take(4).toArray();
    expect(actual).toEqual([3, -2, -7, -12]);
  });
});
test('toNegativeInfinity supports a custom start and step', () => {
  expect(Enumerable.toNegativeInfinity(5, 2).take(4).toArray()).toEqual([5, 3, 1, -1]);
});

test('toNegativeInfinity can emit a constant value when the step is zero', () => {
  expect(Enumerable.toNegativeInfinity(3, 0).take(3).toArray()).toEqual([3, 3, 3]);
});
