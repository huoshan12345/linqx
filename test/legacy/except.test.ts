import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("except", function () {
      let actual: any = Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9])
          .except([4, 6, 2, 7, 8, 10, 11])
          .toArray();
      deepEqual(actual, [1, 3, 5, 9]);
      actual = Enumerable.range(1, 10).select((value) => ({test:value%3}))
          .except(Enumerable.range(1, 10).select((value) => ({test:value%2})), (value) => value.test)
          .toArray();
      deepEqual(actual, [{ test: 2 }]);
  });
});
