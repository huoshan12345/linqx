import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("repeat", function () {
      let actual = Enumerable.repeat("temp").take(3).toArray();
      deepEqual(actual, ["temp", "temp", "temp"]);
      actual = Enumerable.repeat("temp", 5).toArray();
      deepEqual(actual, ["temp", "temp", "temp", "temp", "temp"]);
  });
});
