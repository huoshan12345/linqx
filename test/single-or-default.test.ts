import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("singleOrDefault", function () {
      let actual = Enumerable.range(1, 10).singleOrDefault((i) => i*3==6, 4);
      strictEqual(actual, 2);
      actual = Enumerable.range(1, 10).singleOrDefault((i) => i>13, 40);
      strictEqual(actual, 40);
  
      strictEqual(Enumerable.range(1, 1).singleOrDefault(), 1);
      strictEqual(Enumerable.range(1, 10).singleOrDefault((i) => i*3==6), 2);
      strictEqual(Enumerable.range(1, 10).singleOrDefault((i) => i>13), null);
      strictEqual(Enumerable.empty().singleOrDefault(), null);
  });
});
