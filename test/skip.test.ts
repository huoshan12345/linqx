import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("skip", function () {
    expect(arraySequence.skip(3).toArray()).toEqual([1000, 10000]);
    expect(arraySequence.skip(-10).toArray()).toEqual([1, 10, 100, 1000, 10000]);
    expect(arraySequence.skip(10).toArray()).toEqual([]);
    expect(emptySequence.skip(3).toArray()).toEqual([]);
  });
});

describe("Paging", () => {
  test("skip", function () {
    const actual = Enumerable.range(1, 10).skip(4).toArray();
    expect(actual).toEqual([5, 6, 7, 8, 9, 10]);
  });
});
test('skip treats a negative count as zero', () => {
  expect(Enumerable.range(1, 3).skip(-1).toArray()).toEqual([1, 2, 3]);
});
