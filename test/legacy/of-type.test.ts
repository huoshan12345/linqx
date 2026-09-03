import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("ofType", function () {
      var seq = Enumerable.from([1, 2, "hoge", "3", 4, true]);
      deepEqual(seq.ofType(Number).toArray(), [1, 2, 4]);
      deepEqual(seq.ofType(String).toArray(), ["hoge", "3"]);
      deepEqual(seq.ofType(Boolean).toArray(), [true]);
  
      var Cls = function (val) { this.val = val; }
      seq = Enumerable.from([new Cls("a"), new Cls("b"), 1, 2, new Cls("c"), 3]);
      deepEqual(seq.ofType(Cls).select("$.val").toArray(), ["a", "b", "c"]);
  });
});
