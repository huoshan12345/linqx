import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("generate", function () {
      let actual = Enumerable.generate(function () { return "temp" }).take(3).toArray();
      deepEqual(actual, ["temp", "temp", "temp"]);
      actual = Enumerable.generate(function () { return "temp" }, 5).toArray();
      deepEqual(actual, ["temp", "temp", "temp", "temp", "temp"]);
  });
});
