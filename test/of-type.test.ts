import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("ofType", function () {
      const seq = Enumerable.from([1, 2, "hoge", "3", 4, true]);
      deepEqual(seq.ofType<number>(Number).toArray(), [1, 2, 4]);
      deepEqual(seq.ofType<string>(String).toArray(), ["hoge", "3"]);
      deepEqual(seq.ofType<boolean>(Boolean).toArray(), [true]);
  
      class Cls {
          constructor(public val: string) {}
      }
      const instances = Enumerable.from([new Cls("a"), new Cls("b"), 1, 2, new Cls("c"), 3]);
      deepEqual(instances.ofType<Cls>(Cls).select((value) => value.val).toArray(), ["a", "b", "c"]);
  });
});
