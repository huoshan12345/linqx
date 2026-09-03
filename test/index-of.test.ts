import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("indexOf", function () {
      let actual = Enumerable.range(1, 10).indexOf(3);
      strictEqual(actual, 2);
  
      strictEqual(Enumerable.from([1, 10, 100, 1000, 100, 100]).indexOf(100), 2);
  
      strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).indexOf(3), 2);
      strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).indexOf(function (x) { return x == 3; }), 2);
  });
});
