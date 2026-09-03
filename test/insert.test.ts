import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Set", () => {
  test("insert", function () {
      let actual = Enumerable.range(1, 5).insert(3, [20, 21, 22]).toArray();
      deepEqual(actual, [1, 2, 3, 20, 21, 22, 4, 5]);
  });
});
