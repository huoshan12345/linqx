import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Aggregate", () => {
  test("aggregate", function () {
      strictEqual(Enumerable.range(1, 10).aggregate((a,b) => a+b), 55);
      strictEqual(Enumerable.range(1, 10).aggregate(10, (a,b) => a+b), 65);
      strictEqual(Enumerable.range(1, 10).aggregate(10, (a,b) => a+b, (val) => val*10), 650);
      strictEqual(Enumerable.range(1, 10).aggregate("", (s,x) => s+x, (value) => 'hoge' + value), "hoge12345678910");
  });
});
