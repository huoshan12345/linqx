import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("distinct", function () {
      let actual = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).distinct().toArray();
      deepEqual(actual, [1, 3, 5, 6, 4, 2, 9]);
      actual = Enumerable.range(1, 10).select("{test:$%2}").distinct("$.test").toArray();
      deepEqual(actual, [{ test: 1 }, { test: 0 }]);
  });
});
