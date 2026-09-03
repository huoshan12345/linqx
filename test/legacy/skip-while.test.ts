import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Paging", () => {
  test("skipWhile", function () {
      let actual = Enumerable.range(1, 10).skipWhile((i) => i<8).toArray();
      deepEqual(actual, [8, 9, 10]);
  
      actual = Enumerable.range(1, 10).skipWhile((v,i) => i<8).toArray();
      deepEqual(actual, [9, 10]);
  });
});
