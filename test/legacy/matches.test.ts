import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("matches", function () {
      let actual = Enumerable.matches("xbcyBCzbc", /(.)bc/i).select((value) => value.index+value[1]).toArray();
      deepEqual(actual, ["0x", "3y", "6z"]);
      actual = Enumerable.matches("xbcyBCzbc", "(.)bc").select((value) => value.index+value[1]).toArray();;
      deepEqual(actual, ["0x", "6z"]);
      actual = Enumerable.matches("xbcyBCzbc", "(.)bc", "i").select((value) => value.index+value[1]).toArray();;
      deepEqual(actual, ["0x", "3y", "6z"]);
  });
});
