import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("Max", function () {
      let actual = Enumerable.range(1, 10).max();
      equal(actual, 10);
  
      actual = Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).max((t) => t.i);
      equal(actual, 9);
  });
});
