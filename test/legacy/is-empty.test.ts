import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("isEmpty", function () {
      var _ = Enumerable.range(1, 10).isEmpty();
  
      strictEqual(_, false);
      strictEqual(Enumerable.empty().isEmpty(), true);
  
      Enumerable.Utils.extendTo(Array);
      strictEqual([].isEmpty(), true);
      Enumerable.Utils.recallFrom(Array);
  });
});
