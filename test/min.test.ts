import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("min", function () {
      let actual = Enumerable.range(1, 10).min();
      equal(actual, 1);
  
      actual = Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).min((t) => t.i);
      equal(actual, 0);
  });
});
