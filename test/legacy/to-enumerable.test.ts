import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Dictionary", () => {
  interface ObjectKey { a: number }

  var aComparer = function (x: ObjectKey) { return x.a }

  var obj1 = { a: 1 }

  var obj1_ = { a: 1 }

  var obj2 = { a: 2 }

  var obj2_ = { a: 2 }

  test("toEnumerable", function ()
  {
      const stringDictionary = Enumerable.empty<{ key: string; value: number }>()
          .toDictionary((entry) => entry.key, (entry) => entry.value);
      stringDictionary.add("a", 1);
      stringDictionary.add("b", 2);
      stringDictionary.add("c", 3);
  
      var ar = stringDictionary.toEnumerable().orderBy((value) => value.key).toArray();
      equal("a", ar[0].key);
      equal(1, ar[0].value);
      equal("b", ar[1].key);
      equal(2, ar[1].value);
      equal("c", ar[2].key);
      equal(3, ar[2].value);
  
      const objectDictionary = Enumerable.empty<{ key: ObjectKey; value: number }>()
          .toDictionary((entry) => entry.key, (entry) => entry.value);
      objectDictionary.add(obj1, 1);
      objectDictionary.add(obj1_, 2);
      objectDictionary.add(obj2, 3);
      objectDictionary.add(obj2_, 4);
  
      const objectEntries = objectDictionary.toEnumerable().orderBy((value) => value.key.a).toArray();
      equal(obj1, objectEntries[0].key);
      equal(1, objectEntries[0].value);
      equal(obj1_, objectEntries[1].key);
      equal(2, objectEntries[1].value);
      equal(obj2, objectEntries[2].key);
      equal(3, objectEntries[2].value);
      equal(obj2_, objectEntries[3].key);
      equal(4, objectEntries[3].value);
  
      const comparedDictionary = Enumerable.empty<{ key: ObjectKey; value: number }>()
          .toDictionary((entry) => entry.key, (entry) => entry.value, aComparer);
      comparedDictionary.add(obj1, 1);
      comparedDictionary.add(obj1_, 2);
      comparedDictionary.add(obj2, 3);
      comparedDictionary.add(obj2_, 4);
      const comparedEntries = comparedDictionary.toEnumerable().orderBy((value) => value.key.a).toArray();
      equal(obj1_, comparedEntries[0].key);
      equal(2, comparedEntries[0].value);
      equal(obj2_, comparedEntries[1].key);
      equal(4, comparedEntries[1].value);
  });
});
