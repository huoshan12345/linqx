import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("scan", function () {
      let actual = Enumerable.range(1, 10).scan((a,b) => a+b).toArray();
      deepEqual(actual, [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]);
      var seed = 100;
      actual = Enumerable.range(1, 10).scan(seed, (a,b) => a+b).toArray();
      deepEqual(actual, [100, 101, 103, 106, 110, 115, 121, 128, 136, 145, 155]);
  });
});
