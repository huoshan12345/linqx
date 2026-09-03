import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("last", function () {
      equal(arraySequence.last(), 10000);
      equal(arraySequence.last((value) => value<=500), 100);
  
      try {
          arraySequence.last((value) => value==-1);
          ok(false);
      }
      catch (e) { ok(true); }
  
      try {
          emptySequence.last();
          ok(false);
      }
      catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("last", function () {
      let actual = Enumerable.range(1, 10).last();
      strictEqual(actual, 10);
  
      actual = Enumerable.range(1, 10).last((i) => i<6);
      strictEqual(actual, 5);
  });
});
