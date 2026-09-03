import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("empty", function () {
      let actual = Enumerable.empty().toArray();
      deepEqual(actual, []);
  });
});
