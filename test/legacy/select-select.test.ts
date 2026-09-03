import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("selectselect", function () {
      deepEqual(seq2.select("$*10").select("$*2").toArray(), [100, 120, 140, 160, 180]);
      deepEqual(seq2.select("$$*2").select("$+$$*20").toArray(), [0, 22, 44, 66, 88]);
      deepEqual(seq2.select("$*10").select("$+$$*2").toArray(), [50, 62, 74, 86, 98]);
      deepEqual(seq2.select("$$*2").select("$*10").toArray(), [0, 20, 40, 60, 80]);
  });
});
