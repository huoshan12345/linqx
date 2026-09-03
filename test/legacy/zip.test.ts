import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("zip", function () {
      let actual = Enumerable.range(1, 10).zip(Enumerable.range(20, 5), (outer,inner) => outer+inner).toArray();
      deepEqual(actual, [21, 23, 25, 27, 29]);
      actual = Enumerable.range(1, 10).zip(Enumerable.range(20, 5), (outer,inner,index) => outer+inner+index).toArray();
      deepEqual(actual, [21, 24, 27, 30, 33]);
  });

  test("zip2", function () {
      Enumerable.Utils.extendTo(Array);
  
      deepEqual([1, 2, 3]
          .zip(
              [-3, 4, 10],
              [5, 6, 7],
              function (x, y, z) { return x * y * z; }).toArray(),
          [-15, 48, 210]);
  
      deepEqual([1, 2, 3]
          .zip(
              [-3, 4, 10],
              [-3, 4, 10],
              function (x, y, z, i) { return i; }).toArray(),
          [0, 1, 2]);
  
      deepEqual([1, 2, 3]
          .zip(
              [-3, 4, 10],
              [-7, 20, 30, 100],
              function (x, y, z) { return x * y + z; }).toArray(),
          [-10, 28, 60]);
  
      deepEqual([1, 2, 3]
          .zip(
              [-3, 4, 10],
              [-7, 20, 30, 100],
              function (x, y, z, i) { return z + i; }).toArray(),
          [-7, 21, 32]);
  
      Enumerable.Utils.recallFrom(Array);
  
      deepEqual(Enumerable.from("abc").zip("fghk", "lmnopq", "stuv", "yz0124", "56780",
          function (a, b, c, d, e, f) { return a + b + c + d + e + f }).toArray(),
          ["aflsy5", "bgmtz6", "chnu07"]);
  });
});
