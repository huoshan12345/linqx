import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Join", () => {
  test("leftJoin", function ()
  {
      var math = { yamada: 100, tanaka: 80, yoshida: 94 };
      var english = { yamada: 73, tanaka: 99 };
      let actual = Enumerable.from(math)
          .leftJoin(english, "outer=>outer.key", "inner=>inner.key",
              (o,i) => ({Name:o.key,Math:o.value,English:i == null ? null : i.value}))
          .toArray();
      let expected = [{ Name: "yamada", Math: 100, English: 73 },
                      { Name: "tanaka", Math: 80, English: 99 },
                      { Name: "yoshida", Math: 94, English: null}];
      deepEqual(actual, expected);
  
      actual = Enumerable.from(math)
          .leftJoin(english, "outer=>outer", "inner=>inner",
          (o,i) => ({Name:o.key,Math:o.value,English:i == null ? null : i.value}), 
          "$.key")
          .toArray();
      expected = [{ Name: "yamada", Math: 100, English: 73 },
                  { Name: "tanaka", Math: 80, English: 99 },
                  { Name: "yoshida", Math: 94, English: null}];
      deepEqual(actual, expected);
  });
});
