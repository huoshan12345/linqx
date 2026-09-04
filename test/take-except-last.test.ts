import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("takeExceptLast", function () {
    expect(arraySequence.takeExceptLast().toArray()).toEqual([1, 10, 100, 1000]);
    expect(arraySequence.takeExceptLast(3).toArray()).toEqual([1, 10]);
    expect(arraySequence.takeExceptLast(-100).toArray()).toEqual([1, 10, 100, 1000, 10000]);
    expect(arraySequence.takeExceptLast(0).toArray()).toEqual([1, 10, 100, 1000, 10000]);
    expect(arraySequence.takeExceptLast(100).toArray()).toEqual([]);
  });
});

describe("Paging", () => {
  test("takeExceptLast", function () {
    let actual = Enumerable.range(1, 10).takeExceptLast().toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    actual = Enumerable.range(1, 10).takeExceptLast(3).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7]);
    actual = Enumerable.range(1, 10).takeExceptLast(-1).toArray();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 10).takeExceptLast(100).toArray();
    expect(actual).toEqual([]);
  });
});
test('takeExceptLast treats a non-positive count as zero', () => {
  expect(Enumerable.range(1, 3).takeExceptLast(0).toArray()).toEqual([1, 2, 3]);
});
