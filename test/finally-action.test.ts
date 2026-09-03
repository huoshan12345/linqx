import { describe } from 'vitest';
import Enumerable from '../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("ErrorHandling", () => {
  test("finallyAction", function ()
  {
      let msg = "";
      let actual = Enumerable.range(1, 10)
          .select(function (i)
          {
              if (i == 5) throw new Error("aiueo");
              return i;
          })
          .catchError(function (e)
          {
              msg = e instanceof Error ? e.message : String(e);
          })
          .finallyAction(function ()
          {
              msg += "f";
          })
          .toArray();
      deepEqual(actual, [1, 2, 3, 4]);
      equal(msg, "aiueof");
  });
});
