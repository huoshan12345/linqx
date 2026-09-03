import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("skip", function () {
    deepEqual(arraySequence.skip(3).toArray(), [1000, 10000]);
    deepEqual(arraySequence.skip(-10).toArray(), [1, 10, 100, 1000, 10000]);
    deepEqual(arraySequence.skip(10).toArray(), []);
    deepEqual(emptySequence.skip(3).toArray(), []);
  });
});

describe("Paging", () => {
  test("skip", function () {
    const actual = Enumerable.range(1, 10).skip(4).toArray();
    deepEqual(actual, [5, 6, 7, 8, 9, 10]);
  });
});
test('skip treats a negative count as zero', () => {
  expect(Enumerable.range(1, 3).skip(-1).toArray()).toEqual([1, 2, 3]);
});
