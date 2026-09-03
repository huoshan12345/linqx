import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Iterator", () => {
  test("for..of", function () {
      let actual: any[] = [];
      for (var a of Enumerable.from([1, 2, 3])) {
          actual.push(a);
      }
      deepEqual(actual, [1, 2, 3]);
  });

  test("Symbol.iterator", function ()
  {
      let actual = [1,2,3,4];
      let expected = Array.from(Enumerable.from(actual));
      deepEqual(actual, expected);
      let actual2 = actual.map(function(x) { return x * 2 }); // [2,4,6,8];
      expected = Enumerable.from(actual).select(function(x) { return x * 2 });
      deepEqual(actual2, Array.from(expected));
  });

  test("reusable iterator", function () {
      const set = new Set([1, 2, 3])
  
      let a = Enumerable.from(set.entries());
  
      deepEqual(a.toArray(), [[1, 1], [2, 2], [3, 3]]);
      deepEqual(a.toArray(), []);
  
      let b = Enumerable.from(() => set.entries());
  
      deepEqual(b.toArray(), [[1, 1], [2, 2], [3, 3]]);
      deepEqual(b.toArray(), [[1, 1], [2, 2], [3, 3]]);
  
      let c = Enumerable.from(() => ['x', 'y', 'z']);
  
      deepEqual(c.toArray(), ['x', 'y', 'z']);
      deepEqual(c.toArray(), ['x', 'y', 'z']);
  });
});
