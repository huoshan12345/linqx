import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Aggregate", () => {
  test("minBy", function () {
      let actual = Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).minBy((t) => t.i);
      deepEqual(actual, { v: 1, i: 0 });
  });
});
