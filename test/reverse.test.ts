import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ArrayEnumerable", () => {
  var arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  var emptySequence = Enumerable.from([]);

  test("reverse", function () {
      deepEqual(arraySequence.reverse().toArray(), [10000, 1000, 100, 10, 1]);
      deepEqual(emptySequence.reverse().toArray(), []);
  });
});

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

  test("reverse", function () {
      actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
          .reverse()
          .toArray();
      deepEqual(actual, [99, 51, 31, 85, 823, 7, 51, 1]);
  });
});
