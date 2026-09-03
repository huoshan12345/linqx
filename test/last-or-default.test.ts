import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("lastOrDefault", function () {
      // No arguments.
      strictEqual(arraySequence.lastOrDefault(), 10000);
      strictEqual(emptySequence.lastOrDefault(), undefined);
  
      // No predicate.
      strictEqual(arraySequence.lastOrDefault(0), 10000);
      strictEqual(emptySequence.lastOrDefault(0), 0);
      strictEqual(emptySequence.lastOrDefault(undefined), undefined);
  
      // No default value.
      strictEqual(arraySequence.lastOrDefault((i) => true), 10000);
      strictEqual(emptySequence.lastOrDefault((i) => true), undefined);
  
      // Both arguments.
      strictEqual(arraySequence.lastOrDefault((i) => true, 0), 10000);
      strictEqual(emptySequence.lastOrDefault((i) => true, 0), 0);
      strictEqual(emptySequence.lastOrDefault((i) => true, null), null);
      strictEqual(emptySequence.lastOrDefault((i) => true, undefined), undefined);
  });
});

describe("Paging", () => {
  test("lastOrDefault", function () {
      var nonEmpty = Enumerable.range(1, 10);
      var empty = Enumerable.empty();
  
      // No arguments.
      strictEqual(nonEmpty.lastOrDefault(), 10);
      strictEqual(empty.lastOrDefault(), undefined);
  
      // No predicate.
      strictEqual(nonEmpty.lastOrDefault(0), 10);
      strictEqual(empty.lastOrDefault(0), 0);
      strictEqual(empty.lastOrDefault(undefined), undefined);
  
      // No default value.
      strictEqual(nonEmpty.lastOrDefault((i) => true), 10);
      strictEqual(empty.lastOrDefault((i) => true), undefined);
  
      // Both arguments.
      strictEqual(nonEmpty.lastOrDefault((i) => true, 0), 10);
      strictEqual(empty.lastOrDefault((i) => true, 0), 0);
      strictEqual(empty.lastOrDefault((i) => true, null), null);
      strictEqual(empty.lastOrDefault((i) => true, undefined), undefined);
  });
});
