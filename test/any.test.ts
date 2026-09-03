import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("any", function () {
      ok(arraySequence.any());
      ok(!emptySequence.any());
      ok(arraySequence.any((value) => value==100));
      ok(!emptySequence.any((value) => value==2));
  });
});

describe("Set", () => {
  test("any", function () {
      var seq = Enumerable.range(1, 10);
      var empty = Enumerable.empty();
      ok(seq.any());
      ok(!empty.any());
      ok(seq.any((value) => value==5));
      ok(!seq.any((value) => value==100));
  });
});
