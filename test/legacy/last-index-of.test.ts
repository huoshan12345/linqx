import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Paging", () => {
  test("lastIndexOf", function () {
      let actual = Enumerable.from([1, 2, 3, 2, 5]).lastIndexOf(2)
      strictEqual(actual, 3);
  
      Enumerable.Utils.extendTo(Array);
  
      strictEqual([1, 2, 3, 3, 3, 4, 5].asEnumerable().lastIndexOf(3), 4);
      strictEqual([1, 2, 3, 3, 3, 4, 5].asEnumerable().lastIndexOf(function (x) { return x == 3; }), 4);
  
      Enumerable.Utils.recallFrom(Array);
  });
});
