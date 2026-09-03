import { describe } from 'vitest';
import Enumerable from './sut.js';
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

  test("orderByDescending", function () {
      actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
          .orderByDescending((i) => i)
          .toArray();
      deepEqual(actual, [823, 99, 85, 51, 51, 31, 7, 1]);
  
      deepEqual(Enumerable.rangeTo(1, 10).orderByDescending((value) => value%5).toArray(), [4, 9, 3, 8, 2, 7, 1, 6, 5, 10]);
  
      const letters = ['b', 'a', 'd', 'c'];
      deepEqual(Enumerable.from(letters)
          .orderByDescending(x=>x, (x, y)=>x < y ? -1 : +(x > y)).toArray(), ['d', 'c', 'b', 'a']);
  });
});
