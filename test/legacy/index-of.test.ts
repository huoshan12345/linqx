import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Paging", () => {
  test("indexOf", function () {
      let actual = Enumerable.range(1, 10).indexOf(3);
      strictEqual(actual, 2);
  
      Enumerable.Utils.extendTo(Array);
  
      strictEqual([1, 10, 100, 1000, 100, 100].asEnumerable().indexOf(100), 2);
  
      strictEqual([1, 2, 3, 3, 3, 4, 5].asEnumerable().indexOf(3), 2);
      strictEqual([1, 2, 3, 3, 3, 4, 5].asEnumerable().indexOf(function (x) { return x == 3; }), 2);
  
      Enumerable.Utils.recallFrom(Array);
  });
});
