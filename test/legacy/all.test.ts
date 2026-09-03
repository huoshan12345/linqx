import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Set", () => {
  test("all", function () {
      var seq = Enumerable.range(1, 10);
      ok(!seq.all((i) => i%2==0));
      ok(seq.all((i) => i<=10));
  });
});
