import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("whereselect", function () {
      deepEqual(seq.where("$%2==0").select("$*2").toArray(), [12, 16, 20, 24, 28]);
      deepEqual(seq.where("$%2==0").select("$+$$*2").toArray(), [6, 10, 14, 18, 22]);
      deepEqual(seq.where("$$%2==0").select("$*2").toArray(), [10, 14, 18, 22, 26]);
      deepEqual(seq.where("$$%2==0").select("$+$$*2").toArray(), [5, 9, 13, 17, 21]);
  });
});
