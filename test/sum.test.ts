import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("sum", function () {
      let actual = Enumerable.range(1, 10).sum();
      equal(actual, 55);
      actual = Enumerable.empty().sum();
      equal(actual, 0);
  
      actual = Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).sum((t) => t.i);
      equal(actual, 45);
  });
});
