import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("elementAtOrDefault", function () {
      equal(arraySequence.elementAtOrDefault(4), 10000);
      equal(arraySequence.elementAtOrDefault(-1, -100), -100);
      equal(arraySequence.elementAtOrDefault(5, -100), -100);
  });
});

describe("Paging", () => {
  test("elementAtOrDefault", function () {
      let actual = Enumerable.range(1, 10).elementAtOrDefault(3, 0);
      strictEqual(actual, 4);
      actual = Enumerable.range(1, 10).elementAtOrDefault(31, 0);
      strictEqual(actual, 0);
  
      actual = Enumerable.range(1, 10).elementAtOrDefault(3, "foo");
      strictEqual(actual, 4);
      actual = Enumerable.range(1, 10).elementAtOrDefault(31, "foo");
      strictEqual(actual, "foo");
  });
});
