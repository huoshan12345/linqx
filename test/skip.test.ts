import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("skip", function () {
      deepEqual(arraySequence.skip(3).toArray(), [1000, 10000]);
      deepEqual(arraySequence.skip(-10).toArray(), [1, 10, 100, 1000, 10000]);
      deepEqual(arraySequence.skip(10).toArray(), []);
      deepEqual(emptySequence.skip(3).toArray(), []);
  });
});

describe("Paging", () => {
  test("skip", function () {
      let actual = Enumerable.range(1, 10).skip(4).toArray();
      deepEqual(actual, [5, 6, 7, 8, 9, 10]);
  });
});
