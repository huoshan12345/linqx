import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("wherewhere", function () {
      deepEqual(seq.where("$%2==0").where("$%3==0").toArray(), [6, 12]);
      deepEqual(seq.where("$$%2==0").where("$$%2==0").toArray(), [5, 9, 13]);
      deepEqual(seq.where("$%2==0").where("$$%2==0").toArray(), [6, 10, 14]);
      deepEqual(seq.where("$$%2==0").where("$%3==0").toArray(), [9]);
  });
});
