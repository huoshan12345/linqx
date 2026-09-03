import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("toNegativeInfinity", function () {
      let actual = Enumerable.toNegativeInfinity().where((i) => i%2==0).take(10).toArray();
      deepEqual(actual, [0, -2, -4, -6, -8, -10, -12, -14, -16, -18]);
      actual = Enumerable.toNegativeInfinity(3).take(10).toArray();
      deepEqual(actual, [3, 2, 1, 0, -1, -2, -3, -4, -5, -6]);
      actual = Enumerable.toNegativeInfinity(3, 5).take(4).toArray();
      deepEqual(actual, [3, -2, -7, -12]);
  });
});
