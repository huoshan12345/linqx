import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Set", () => {
  test("isEmpty", function () {
      var _ = Enumerable.range(1, 10).isEmpty();
  
      strictEqual(_, false);
      strictEqual(Enumerable.empty().isEmpty(), true);
  
      strictEqual(Enumerable.from([]).isEmpty(), true);
  });
});
