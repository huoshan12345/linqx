import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("elementAt", function () {
      equal(arraySequence.elementAt(3), 1000);
      try {
          arraySequence.elementAt(-1);
          ok(false);
      }
      catch (e) { ok(true, "okay"); }
  
      try {
          arraySequence.elementAt(100);
          ok(false);
      }
      catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("elementAt", function () {
      let actual = Enumerable.range(1, 10).elementAt(5);
      strictEqual(actual, 6);
  });
});
