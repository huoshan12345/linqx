import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("select", function () {
      let actual = Enumerable.range(1, 10).select("i=>i*10").toArray();
      deepEqual(actual, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
      actual = Enumerable.range(1, 10).select("i,index=>i*10+index").toArray();
      deepEqual(actual, [10, 21, 32, 43, 54, 65, 76, 87, 98, 109]);
  });
});

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("select", function () {
      deepEqual(seq2.select("$*10").toArray(), [50, 60, 70, 80, 90]);
      deepEqual(seq2.select("$$*2").toArray(), [0, 2, 4, 6, 8]);
  });
});
