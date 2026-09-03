import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Convert", () => {
  test("toArray", function ()
  {
      let actual = Enumerable.range(1, 10).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
