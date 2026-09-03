import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Convert", () => {
  test("toObject", function ()
  {
      let actual = Enumerable.range(1, 3).toObject((i) => 'foo'+i, (i) => i*4);
      deepEqual(actual, { foo1: 4, foo2: 8, foo3: 12 });
  });
});
