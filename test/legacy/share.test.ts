import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Functional", () => {
  test("share", function ()
  {
      var share = Enumerable.range(1, 10).share();
      var ar1 = share.take(4).toArray();
      var ar2 = share.toArray();
      var ar3 = share.toArray();
      deepEqual(ar1, [1, 2, 3, 4]);
      deepEqual(ar2, [5, 6, 7, 8, 9, 10]);
      deepEqual(ar3, []);
  });
});
