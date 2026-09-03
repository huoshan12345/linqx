import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("unfold", function () {
      let actual = Enumerable.unfold(5, (value) => value+3).take(5).toArray();
      deepEqual(actual, [5, 8, 11, 14, 17]);
  });
});
