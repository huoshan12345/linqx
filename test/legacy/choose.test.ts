import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("choose", function () {
      const sequence = Enumerable.from<(number | null)>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      deepEqual(sequence.choose(function (x) {
          return x !== null && x % 2 == 0 ? null : x;
      }).toArray(), [1, 3, 5, 7, 9]);
  });
});
