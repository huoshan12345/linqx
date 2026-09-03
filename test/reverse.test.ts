import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("reverse", function () {
    deepEqual(arraySequence.reverse().toArray(), [10000, 1000, 100, 10, 1]);
    deepEqual(emptySequence.reverse().toArray(), []);
  });
});

describe("Ordering", () => {
  test("reverse", function () {
    const actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
      .reverse()
      .toArray();
    deepEqual(actual, [99, 51, 31, 85, 823, 7, 51, 1]);
  });
});
test('reverse handles an empty sequence', () => {
  expect(Enumerable.empty<number>().reverse().toArray()).toEqual([]);
});
