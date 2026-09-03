import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("pairwise", function () {
      let actual = Enumerable.range(1, 4).pairwise((prev,next) => ({p:prev,n:next})).toArray();
      deepEqual(actual, [{ p: 1, n: 2 }, { p: 2, n: 3 }, { p: 3, n: 4 }]);
  });
});
