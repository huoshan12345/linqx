import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("selectMany", function () {
      let actual = Enumerable.range(1, 5)
                         .selectMany(function(i) { return Enumerable.repeat(i, 2); })
                         .toArray();
      deepEqual(actual, [1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
      actual = Enumerable.range(1, 5)
                         .selectMany(function(i, index) { return Enumerable.repeat(i, index + 1); })
                         .toArray();
      deepEqual(actual, [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
      actual = Enumerable.range(1, 5)
                         .selectMany(function(i) { return Enumerable.repeat(i, 2); }, (i) => i*10)
                         .toArray();
      deepEqual(actual, [10, 10, 20, 20, 30, 30, 40, 40, 50, 50]);
      actual = Enumerable.range(1, 5)
                         .selectMany(function(i, index) { return Enumerable.repeat(i, index + 1); }, (i) => i*10)
                         .toArray();
      deepEqual(actual, [10, 20, 20, 30, 30, 30, 40, 40, 40, 40, 50, 50, 50, 50, 50]);
  });
});
