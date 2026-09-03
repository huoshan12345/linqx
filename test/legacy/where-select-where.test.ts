import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("whereselectwhere", function () {
      deepEqual(seq.where("$%2==0").select("$*2").where("$%3==0").toArray(), [12, 24]);
      deepEqual(seq.where("$%2==0").select("$+$$*2").where("$$%2==0").toArray(), [6, 14, 22]);
      deepEqual(seq.where("$$%2==0").select("$*2").where("$$%2==0").toArray(), [10, 18, 26]);
      deepEqual(seq.where("$$%2==0").select("$+$$*2").where("$%3==0").toArray(), [9, 21]);
  });
});
