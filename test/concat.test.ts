import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Set", () => {
  test("concat", function () {
      let actual = Enumerable.range(1, 3).concat([20, 21, 22]).toArray();
      deepEqual(actual, [1, 2, 3, 20, 21, 22]);
  
  
      deepEqual(Enumerable.range(1, 3).concat([]).toArray(), [1, 2, 3]);
      deepEqual(Enumerable.range(1, 3).concat([2, 3], [4, 5]).toArray(), [1, 2, 3, 2, 3, 4, 5]);
      var range = Enumerable.rangeTo(3, 5);
      deepEqual(range.concat(range, range, range, range).toArray(), Enumerable.repeat(range, 5).selectMany((value) => value).toArray());
  });
});
