import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Ordering", () => {
  var expected, actual;

  var list = [
      { a: 2, b: 4, c: 1 },
      { a: 2, b: 3, c: 7 },
      { a: 6, b: 6, c: 3 },
      { a: 4, b: 4, c: 5 },
      { a: 7, b: 3, c: 2 },
      { a: 4, b: 4, c: 3 }
  ];

  var strlist = [
      { a: "a", b: "z", c: "b" },
      { a: "z", b: "e", c: "e" },
      { a: "n", b: "d", c: "q" },
      { a: "a", b: "c", c: "k" },
      { a: "n", b: "d", c: "o" }
  ];

  test("shuffle", function () {
      var array = [1, 51, 7, 823, 85, 31, 51, 99];
      var shuffled = Enumerable.from(array).shuffle().toArray();
      notDeepEqual(shuffled, array);
  });
});
