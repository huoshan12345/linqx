import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("takeExceptLast", function () {
    deepEqual(arraySequence.takeExceptLast().toArray(), [1, 10, 100, 1000]);
    deepEqual(arraySequence.takeExceptLast(3).toArray(), [1, 10]);
    deepEqual(arraySequence.takeExceptLast(-100).toArray(), [1, 10, 100, 1000, 10000]);
    deepEqual(arraySequence.takeExceptLast(0).toArray(), [1, 10, 100, 1000, 10000]);
    deepEqual(arraySequence.takeExceptLast(100).toArray(), []);
  });
});

describe("Paging", () => {
  test("takeExceptLast", function () {
    let actual = Enumerable.range(1, 10).takeExceptLast().toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    actual = Enumerable.range(1, 10).takeExceptLast(3).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7]);
    actual = Enumerable.range(1, 10).takeExceptLast(-1).toArray();
    deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    actual = Enumerable.range(1, 10).takeExceptLast(100).toArray();
    deepEqual(actual, []);
  });
});
test('takeExceptLast treats a non-positive count as zero', () => {
  expect(Enumerable.range(1, 3).takeExceptLast(0).toArray()).toEqual([1, 2, 3]);
});
