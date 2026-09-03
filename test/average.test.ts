import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("average", function () {
      strictEqual(Enumerable.range(1, 10).average(), 5.5);
      strictEqual(Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).average((t) => t.i), 4.5);
  });
});
