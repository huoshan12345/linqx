import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("take", function () {
      let actual = Enumerable.range(1, 10).take(4).toArray();
      deepEqual(actual, [1, 2, 3, 4]);
  });
});
