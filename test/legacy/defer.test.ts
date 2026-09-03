import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("defer", function () {
      var xs: any[] = [];
  
      var r = Enumerable.range(1, 5)
          .doAction(function (x) { xs.push(x); });
  
      var de = Enumerable.defer(function () { return r; });
  
      equal(xs.length, 0);
  
      deepEqual(de.toArray(), [1, 2, 3, 4, 5]);
      deepEqual(xs, [1, 2, 3, 4, 5]);
  });
});
