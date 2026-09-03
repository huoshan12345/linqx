import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("cycle", function () {
      let actual = Enumerable.cycle(1, 10, 31, 42).take(10).toArray();
      deepEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10]);
      actual = Enumerable.cycle([1, 2, 3, 4, 5]).take(10).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
  
      var seq = Enumerable.make(1).concat([10]).concat([31]).concat([42]);
      actual = Enumerable.cycle(seq).take(10).toArray();
      deepEqual(actual, [1, 10, 31, 42, 1, 10, 31, 42, 1, 10]);
  
      actual = Enumerable.cycle(Enumerable.range(1, 5)).take(10).toArray();
      deepEqual(actual, [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
  
      deepEqual(Enumerable.cycle(1, 2, 3).take(5).toArray(), [1, 2, 3, 1, 2]);
  });
});
