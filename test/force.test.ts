import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Action", () => {
  test("force", function ()
  {
      let actual: any[] = [];
      Enumerable.range(1, 10).doAction(function (i) { actual.push(i) }).force();
      deepEqual(actual, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
