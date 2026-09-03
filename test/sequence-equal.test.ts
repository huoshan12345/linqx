import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("sequenceEqual", function () {
      ok(arraySequence.sequenceEqual([1, 10, 100, 1000, 10000]));
      ok(!arraySequence.sequenceEqual([1, 10, 100, 1000, 10000, 100000]));
      ok(!arraySequence.sequenceEqual([1, 10, 100, 1000]));
      ok(!arraySequence.sequenceEqual([1, 10, 500, 1000, 10000]));
  });
});

describe("Set", () => {
  test("sequenceEqual", function () {
      ok(!Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).sequenceEqual([1, 3, 5]));
      ok(Enumerable.range(1, 10).sequenceEqual(Enumerable.range(1, 10)));
  
      ok(!Enumerable.range(1, 10).select((value) => ({test:value%3}))
          .sequenceEqual(Enumerable.range(1, 10).select((value) => ({test:value%2})), (value) => value.test));
  
      ok(Enumerable.range(1, 10)
          .select((value) => ({test:value%3}))
          .distinct((value) => value.test)
          .sequenceEqual([{ test: 1 }, { test: 2 }, { test: 0 }], (value) => value.test));
  });
});
