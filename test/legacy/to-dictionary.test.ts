import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Convert", () => {
  test("toDictionary", function ()
  {
      let actual = Enumerable.range(1, 3).toDictionary("i=>'foo'+i", "i=>i*4");
      equal(4, actual.get("foo1"));
      equal(8, actual.get("foo2"));
      equal(12, actual.get("foo3"));
  
      actual = Enumerable.range(1, 3).toDictionary("i=>{key:i,V:'foo'+i}", "i=>i*4", "$.key");
      equal(4, actual.get({ key: 1 }));
      equal(8, actual.get({ key: 2 }));
      equal(12, actual.get({ key: 3 }));
  });
});
