import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Action", () => {
  test("doAction", function ()
  {
      var array: any[] = [];
      let actual = Enumerable.range(1, 10).doAction(function (i) { array.push(i) }).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  
      array = []
      var array2: any[] = []
      actual = Enumerable.range(1, 10).doAction(function (v, i) { array.push(v); array2.push(i); }).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      deepEqual(actual, array);
      deepEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], array2);
  });
});
