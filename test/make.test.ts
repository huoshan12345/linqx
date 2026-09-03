import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Enumerable", () => {
  test("make", function () {
      let actual = Enumerable.make("hoge").toArray();
      deepEqual(actual, ["hoge"]);
  });
});
