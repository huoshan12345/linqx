import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Aggregate", () => {
  test("maxBy", function () {
      let actual = Enumerable.range(1, 10).select((v,i) => ({v:v,i:i})).maxBy((t) => t.i);
      deepEqual(actual, { v: 10, i: 9 });
  });
});
