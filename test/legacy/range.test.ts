import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("range", function () {
      let actual = Enumerable.range(1, 10).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      actual = Enumerable.range(1, 5, 3).toArray();
      deepEqual(actual, [1, 4, 7, 10, 13]);
  
      deepEqual(Enumerable.range(3, 4).toArray(), [3, 4, 5, 6]);
      deepEqual(Enumerable.range(-2, 4).toArray(), [-2, -1, 0, 1]);
      deepEqual(Enumerable.range(-2, 4, 2).toArray(), [-2, 0, 2, 4]);
  });
});
