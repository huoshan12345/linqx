import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Convert", () => {
  test("toJSONString", function ()
  {
      let actual = Enumerable.from([{ a: 1, b: true }, { a: null, b: "aaa"}]).toJSONString();
      equal(actual, '[{"a":1,"b":true},{"a":null,"b":"aaa"}]');
  
      actual = Enumerable.range(1, 5).toJSONString();
      equal(actual, '[1,2,3,4,5]');
  
      actual = Enumerable.from(["a", "b", "c"])
          .toJSONString(function (key, value)
          {
              if (value == null || typeof value === 'object') return value;
              return value.toString().toUpperCase();
          });
      equal(actual, '["A","B","C"]');
  
      actual = Enumerable.from([1, 2, 3, 4, 5])
          .toJSONString(function (key, value) { return value; }, 1);
      ok(actual.indexOf("\n") != -1);
  });
});
