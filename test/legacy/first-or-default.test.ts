import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("firstOrDefault", function () {
      // No arguments.
      strictEqual(arraySequence.firstOrDefault(), 1);
      strictEqual(emptySequence.firstOrDefault(), undefined);
  
      // No predicate.
      strictEqual(arraySequence.firstOrDefault(0), 1);
      strictEqual(emptySequence.firstOrDefault(0), 0);
      strictEqual(emptySequence.firstOrDefault(undefined), undefined);
  
      // "null" predicate.
      strictEqual(arraySequence.firstOrDefault(null, 0), 1);
      strictEqual(emptySequence.firstOrDefault(null), undefined); // Because "null" is treated as noop predicate.
      strictEqual(emptySequence.firstOrDefault(null, 0), 0);
      strictEqual(emptySequence.firstOrDefault(null, null), null);
      strictEqual(emptySequence.firstOrDefault(null, undefined), undefined);
  
      // No default value.
      strictEqual(arraySequence.firstOrDefault((i) => true), 1);
      strictEqual(emptySequence.firstOrDefault((i) => true), undefined);
  
      // Both arguments.
      strictEqual(arraySequence.firstOrDefault((i) => true, 0), 1);
      strictEqual(emptySequence.firstOrDefault((i) => true, 0), 0);
      strictEqual(emptySequence.firstOrDefault((i) => true, null), null);
      strictEqual(emptySequence.firstOrDefault((i) => true, undefined), undefined);
  });
});

describe("Paging", () => {
  test("firstOrDefault", function () {
      var nonEmpty = Enumerable.range(1, 10);
      var empty = Enumerable.empty();
  
      // No arguments.
      strictEqual(nonEmpty.firstOrDefault(), 1);
      strictEqual(empty.firstOrDefault(), undefined);
  
      // No predicate.
      strictEqual(nonEmpty.firstOrDefault(0), 1);
      strictEqual(empty.firstOrDefault(0), 0);
      strictEqual(empty.firstOrDefault(undefined), undefined);
  
      // "null" predicate.
      strictEqual(nonEmpty.firstOrDefault(null, 0), 1);
      strictEqual(empty.firstOrDefault(null), undefined); // Because "null" is treated as noop predicate.
      strictEqual(empty.firstOrDefault(null, 0), 0);
      strictEqual(empty.firstOrDefault(null, null), null);
      strictEqual(empty.firstOrDefault(null, undefined), undefined);
  
      // No default value.
      strictEqual(nonEmpty.firstOrDefault((i) => true), 1);
      strictEqual(empty.firstOrDefault((i) => true), undefined);
  
      // Both arguments.
      strictEqual(nonEmpty.firstOrDefault((i) => true, 0), 1);
      strictEqual(empty.firstOrDefault((i) => true, 0), 0);
      strictEqual(empty.firstOrDefault((i) => true, null), null);
      strictEqual(empty.firstOrDefault((i) => true, undefined), undefined);
  });
});
