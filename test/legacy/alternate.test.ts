import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("alternate", function () {
      Enumerable.Utils.extendTo(Array);
  
      // single value
      deepEqual(Enumerable.empty().alternate(-1).toArray(), []);
  
      deepEqual([1].alternate(-1).toArray(), [1]);
      deepEqual([1, 2].alternate(-1).toArray(), [1, -1, 2]);
      deepEqual(Enumerable.range(1, 5).alternate(-1).toArray(), [1, -1, 2, -1, 3, -1, 4, -1, 5]);
      deepEqual(Enumerable.range(1, 6).alternate(-1).toArray(), [1, -1, 2, -1, 3, -1, 4, -1, 5, -1, 6]);
  
      // multiple, array
      deepEqual(Enumerable.empty().alternate([-1, -2]).toArray(), []);
      deepEqual([1].alternate([-1, -2]).toArray(), [1]);
      deepEqual([1, 2].alternate([-1, -2]).toArray(), [1, -1, -2, 2]);
      deepEqual(Enumerable.range(1, 5).alternate([-1, -2]).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
      deepEqual(Enumerable.range(1, 6).alternate([-1, -2]).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);
  
      // multiple, enumerable
      var seq = Enumerable.rangeTo(-1, -2);
      deepEqual(Enumerable.empty().alternate(seq).toArray(), []);
      deepEqual([1].alternate(seq).toArray(), [1]);
      deepEqual([1, 2].alternate(seq).toArray(), [1, -1, -2, 2]);
      deepEqual(Enumerable.range(1, 5).alternate(seq).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5]);
      deepEqual(Enumerable.range(1, 6).alternate(seq).toArray(), [1, -1, -2, 2, -1, -2, 3, -1, -2, 4, -1, -2, 5, -1, -2, 6]);
  });
});
