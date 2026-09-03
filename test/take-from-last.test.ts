import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("takeFromLast", function () {
      deepEqual(arraySequence.takeFromLast(3).toArray(), [100, 1000, 10000]);
      deepEqual(arraySequence.takeFromLast(0).toArray(), []);
      deepEqual(arraySequence.takeFromLast(-100).toArray(), []);
      deepEqual(arraySequence.takeFromLast(100).toArray(), [1, 10, 100, 1000, 10000]);
  });
});

describe("Paging", () => {
  test("takeFromLast", function () {
      let actual = Enumerable.range(1, 10).takeFromLast(3).toArray();
      deepEqual(actual, [8, 9, 10]);
      actual = Enumerable.range(1, 10).takeFromLast(100).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      actual = Enumerable.range(1, 10).takeFromLast(0).toArray();
      deepEqual(actual, []);
      actual = Enumerable.range(1, 10).takeFromLast(-10).toArray();
      deepEqual(actual, []);
  });
});
