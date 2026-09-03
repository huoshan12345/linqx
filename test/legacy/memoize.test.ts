import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Functional", () => {
  test("memoize", function ()
  {
      var count = 0;
      var mem = Enumerable.range(1, 5)
          .select(function (x) { count++; return x; })
          .memoize();
      var ar1 = mem.toArray();
      var ar2 = mem.toArray();
      deepEqual(ar1, [1, 2, 3, 4, 5]);
      deepEqual(ar2, [1, 2, 3, 4, 5]);
      equal(5, count);
  
      const memWithUndefined = Enumerable.from([1, 2, undefined, 3, 4])
          .memoize();
  
      const arWithUndefined1 = memWithUndefined.toArray();
      const arWithUndefined2 = memWithUndefined.toArray();
      deepEqual(arWithUndefined1, [1, 2, undefined, 3, 4]);
      deepEqual(arWithUndefined2, [1, 2, undefined, 3, 4]);
  });
});
