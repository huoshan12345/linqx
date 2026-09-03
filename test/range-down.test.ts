import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("rangeDown", function () {
      let actual = Enumerable.rangeDown(1, 10).toArray();
      deepEqual(actual, [1, 0, -1, -2, -3, -4, -5, -6, -7, -8]);
      actual = Enumerable.rangeDown(1, 5, 3).toArray();
      deepEqual(actual, [1, -2, -5, -8, -11]);
  
      deepEqual(Enumerable.rangeDown(3, 5).toArray(), [3, 2, 1, 0, -1]);
      deepEqual(Enumerable.rangeDown(-2, 4).toArray(), [-2, -3, -4, -5]);
      deepEqual(Enumerable.rangeDown(-2, 4, 2).toArray(), [-2, -4, -6, -8]);
  });
});
