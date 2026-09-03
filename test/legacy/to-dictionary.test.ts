import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';

describe("Convert", () => {
  test("toDictionary", function ()
  {
      const dictionary = Enumerable.range(1, 3).toDictionary((i) => 'foo'+i, (i) => i*4);
      equal(4, dictionary.get("foo1"));
      equal(8, dictionary.get("foo2"));
      equal(12, dictionary.get("foo3"));
  
      const comparedDictionary = Enumerable.range(1, 3).toDictionary((i) => ({key:i,V:'foo'+i}), (i) => i*4, (value) => value.key);
      equal(4, comparedDictionary.get({ key: 1, V: 'ignored' }));
      equal(8, comparedDictionary.get({ key: 2, V: 'ignored' }));
      equal(12, comparedDictionary.get({ key: 3, V: 'ignored' }));
  });
});
