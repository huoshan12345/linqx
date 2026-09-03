import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Enumerable", () => {
  test("repeatWithFinalize", function () {
      var fin;
      let actual = Enumerable.repeatWithFinalize(
          function () { return "temp"; },
          function () { fin = "final"; })
          .take(3).toArray();
      deepEqual(actual, ["temp", "temp", "temp"]);
      equal("final", fin);
  });
});
