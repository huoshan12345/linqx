import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Paging", () => {
  test("take", function () {
    const actual = Enumerable.range(1, 10).take(4).toArray();
    expect(actual).toEqual([1, 2, 3, 4]);
  });
});
test('take returns the entire source when count exceeds its length', () => {
  expect(Enumerable.range(1, 3).take(10).toArray()).toEqual([1, 2, 3]);
});

test('take returns an empty sequence for a non-positive count', () => {
  expect(Enumerable.range(1, 3).take(0).toArray()).toEqual([]);
  expect(Enumerable.range(1, 3).take(-1).toArray()).toEqual([]);
});
