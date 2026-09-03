import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Paging", () => {
  test("single", function () {
      let actual = Enumerable.range(1, 1).single();
      strictEqual(actual, 1);
  
      actual = Enumerable.range(1, 10).single((i) => i==6);
      strictEqual(actual, 6);
  });
});
