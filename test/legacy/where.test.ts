import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("where", function () {
      let actual = Enumerable.range(1, 10).where("i=>i%2==0").toArray();
      deepEqual(actual, [2, 4, 6, 8, 10]);
      actual = Enumerable.range(1, 10).where("i,index=>(i+index)%3==0").toArray();
      deepEqual(actual, [2, 5, 8]);
  });
});

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  // 5-9
  
  test("where", function () {
      deepEqual(seq.where("$%2==0").toArray(), [6, 8, 10, 12, 14]);
      deepEqual(seq.where("$$%2==0").toArray(), [5, 7, 9, 11, 13]);
  });
});
