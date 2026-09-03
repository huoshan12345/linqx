import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("selectwhere", function () {
      deepEqual(seq.select("$*2").where("$%2==0").toArray(), [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]);
      deepEqual(seq.select("$+$$*2").where("$%2==0").toArray(), [8, 14, 20, 26, 32]);
      deepEqual(seq.select("$*2").where("$$%2==0").toArray(), [10, 14, 18, 22, 26]);
      deepEqual(seq.select("$+$$*2").where("$$%2==0").toArray(), [5, 11, 17, 23, 29]);
  });
});
