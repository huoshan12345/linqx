import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Projection", () => {
  test("merge", function () {
      deepEqual(Enumerable.from([1, 2, 3]).merge([-3, 4, 10]).toArray(), [1, -3, 2, 4, 3, 10]);
  
      deepEqual(Enumerable.from([1, 2, 3]).merge([-3, 4], [-7, 20, 30, 100]).toArray(),
          [1, -3, -7, 2, 4, 20, 3, 30, 100]);
  });
});
