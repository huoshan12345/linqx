import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("flatten", function () {
      var array = [1, 31, [431, 41, 5], [1431, 43, [344, 3], 43], 43];
      let actual = Enumerable.from(array).flatten().toArray();
      deepEqual(actual, [1, 31, 431, 41, 5, 1431, 43, 344, 3, 43, 43]);
  });
});
