import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("takeFromLast", function () {
    expect(arraySequence.takeFromLast(3).toArray()).toEqual([100, 1000, 10000]);
    expect(arraySequence.takeFromLast(0).toArray()).toEqual([]);
    expect(arraySequence.takeFromLast(-100).toArray()).toEqual([]);
    expect(arraySequence.takeFromLast(100).toArray()).toEqual([1, 10, 100, 1000, 10000]);
  });
});

describe("Paging", () => {
  test("takeFromLast", function () {
    let actual = Enumerable.range(1, 10).takeFromLast(3).toArray();
    expect(actual).toEqual([8, 9, 10]);
    actual = Enumerable.range(1, 10).takeFromLast(100).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 10).takeFromLast(0).toArray();
    expect(actual).toEqual([]);
    actual = Enumerable.range(1, 10).takeFromLast(-10).toArray();
    expect(actual).toEqual([]);
  });
});
test('takeFromLast returns the entire source when count exceeds its length', () => {
  expect(Enumerable.range(1, 3).takeFromLast(10).toArray()).toEqual([1, 2, 3]);
});
