import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Dictionary", () => {
  var aComparer = function (x) { return x.a }

  var obj1 = { a: 1 }

  var obj1_ = { a: 1 }

  var obj2 = { a: 2 }

  var obj2_ = { a: 2 }

  test("toEnumerable", function ()
  {
      var dict = Enumerable.empty().toDictionary();
      dict.add("a", 1);
      dict.add("b", 2);
      dict.add("c", 3);
  
      var ar = dict.toEnumerable().orderBy("$.key").toArray();
      equal("a", ar[0].key);
      equal(1, ar[0].value);
      equal("b", ar[1].key);
      equal(2, ar[1].value);
      equal("c", ar[2].key);
      equal(3, ar[2].value);
  
      dict.clear();
      dict.add(obj1, 1);
      dict.add(obj1_, 2);
      dict.add(obj2, 3);
      dict.add(obj2_, 4);
  
      ar = dict.toEnumerable().orderBy("$.key.a").toArray();
      equal(obj1, ar[0].key);
      equal(1, ar[0].value);
      equal(obj1_, ar[1].key);
      equal(2, ar[1].value);
      equal(obj2, ar[2].key);
      equal(3, ar[2].value);
      equal(obj2_, ar[3].key);
      equal(4, ar[3].value);
  
      dict = Enumerable.empty().toDictionary("", "", aComparer);
      dict.add(obj1, 1);
      dict.add(obj1_, 2);
      dict.add(obj2, 3);
      dict.add(obj2_, 4);
      ar = dict.toEnumerable().orderBy("$.key.a").toArray();
      equal(obj1_, ar[0].key);
      equal(2, ar[0].value);
      equal(obj2_, ar[1].key);
      equal(4, ar[1].value);
  });
});
