import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("union", function () {
      let actual: any = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
          .union([4, 6, 2, 7, 8, 10, 11])
          .toArray();
      deepEqual(actual, [1, 3, 5, 6, 4, 2, 9, 7, 8, 10, 11]);
      actual = Enumerable.range(1, 3).select((value) => ({test:value}))
          .union(Enumerable.range(2, 3).select((value) => ({test:value})), (value) => value.test)
          .toArray();
      deepEqual(actual, [{ test: 1 }, { test: 2 }, { test: 3 }, { test: 4 }]);
  });
});
