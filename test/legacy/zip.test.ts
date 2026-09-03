import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("zip", function () {
      let actual = Enumerable.range(1, 10).zip(Enumerable.range(20, 5), (outer,inner) => outer+inner).toArray();
      deepEqual(actual, [21, 23, 25, 27, 29]);
      actual = Enumerable.range(1, 10).zip(Enumerable.range(20, 5), (outer,inner,index) => outer+inner+index).toArray();
      deepEqual(actual, [21, 24, 27, 30, 33]);
  });

  test("zip2", function () {
      deepEqual(Enumerable.from([1, 2, 3])
          .zip(
              [-3, 4, 10],
              [5, 6, 7],
              function (x: number, y: number, z: number) { return x * y * z; }).toArray(),
          [-15, 48, 210]);
  
      deepEqual(Enumerable.from([1, 2, 3])
          .zip(
              [-3, 4, 10],
              [-3, 4, 10],
              function (x: number, y: number, z: number, i: number) { return i; }).toArray(),
          [0, 1, 2]);
  
      deepEqual(Enumerable.from([1, 2, 3])
          .zip(
              [-3, 4, 10],
              [-7, 20, 30, 100],
              function (x: number, y: number, z: number) { return x * y + z; }).toArray(),
          [-10, 28, 60]);
  
      deepEqual(Enumerable.from([1, 2, 3])
          .zip(
              [-3, 4, 10],
              [-7, 20, 30, 100],
              function (x: number, y: number, z: number, i: number) { return z + i; }).toArray(),
          [-7, 21, 32]);
  
      deepEqual(Enumerable.from("abc").zip("fghk", "lmnopq", "stuv", "yz0124", "56780",
          function (a: string, b: string, c: string, d: string, e: string, f: string) { return a + b + c + d + e + f }).toArray(),
          ["aflsy5", "bgmtz6", "chnu07"]);
  });
});
