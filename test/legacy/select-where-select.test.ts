import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("selectwhereselect", function () {
      deepEqual(seq.select("$*2").where("$%2==0").select("$*2").toArray(), [20, 24, 28, 32, 36, 40, 44, 48, 52, 56]);
      deepEqual(seq.select("$+$$*2").where("$%2==0").select("$$*2").toArray(), [0, 2, 4, 6, 8]);
      deepEqual(seq.select("$*2").where("$$%2==0").select("$*2+$$").toArray(), [20, 29, 38, 47, 56]);
      deepEqual(seq.select("$+$$*2").where("$$%2==0").select("$*2").toArray(), [10, 22, 34, 46, 58]);
  });
});
