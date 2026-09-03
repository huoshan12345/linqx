import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("traverseDepthFirst", function () {
      let actual = Enumerable.make(1).traverseDepthFirst((value) => Enumerable.make(value+value)).take(7).toArray();
      deepEqual(actual, [1, 2, 4, 8, 16, 32, 64]);
      actual = Enumerable.make(1).traverseDepthFirst((value) => Enumerable.make(value+value), (v,nl) => ({v:v,nl:nl})).take(3).toArray();
      deepEqual(actual, [{ v: 1, nl: 0 }, { v: 2, nl: 1 }, { v: 4, nl: 2 }]);
  });
});
