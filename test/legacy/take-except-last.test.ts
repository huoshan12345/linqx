import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

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
