import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("first", function () {
      equal(arraySequence.first(), 1);
      equal(arraySequence.first((value) => value>=100), 100);
  
      try {
          arraySequence.first((value) => value==-1);
          ok(false);
      }
      catch (e) { ok(true); }
  
      try {
          emptySequence.first();
          ok(false);
      }
      catch (e) { ok(true); }
  });
});

describe("Paging", () => {
  test("first", function () {
      let actual = Enumerable.range(1, 10).first();
      strictEqual(actual, 1);
      actual = Enumerable.range(1, 10).first((i) => i*3==6);
      strictEqual(actual, 2);
  });
});
