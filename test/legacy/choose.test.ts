import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("choose", function () {
      deepEqual(Enumerable.range(1, 10).choose(function (x) {
          return x % 2 == 0 ? null : x;
      }).toArray(), [1, 3, 5, 7, 9]);
  
      deepEqual(Enumerable.range(1, 10).choose().toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
