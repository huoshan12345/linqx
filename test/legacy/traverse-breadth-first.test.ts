import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("traverseBreadthFirst", function () {
      let actual = Enumerable.make(1).traverseBreadthFirst((value) => value+value).take(7).toArray();
      deepEqual(actual, [1, 2, 4, 8, 16, 32, 64]);
      actual = Enumerable.make(1).traverseBreadthFirst((value) => value+value, (v,nl) => ({v:v,nl:nl})).take(3).toArray();
      deepEqual(actual, [{ v: 1, nl: 0 }, { v: 2, nl: 1 }, { v: 4, nl: 2 }]);
  });
});
