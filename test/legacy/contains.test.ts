import { describe } from 'vitest';
import Enumerable from '../legacy-enumerable.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';

describe("Set", () => {
  test("contains", function () {
      var seq = Enumerable.range(1, 10);
      ok(seq.contains(5));
      ok(!seq.contains(13));
  
      seq = Enumerable.range(1, 10).select((value) => ({test:value%2}));
      ok(seq.contains(1, (value) => value.test));
      ok(!seq.contains(3, (value) => value.test));
  });
});

describe('Dictionary', () => {
  test('contains', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);

    ok(dictionary.contains('a'));
    ok(dictionary.contains('b'));
    ok(dictionary.contains(obj1));
    ok(dictionary.contains(obj1Copy));
    ok(!dictionary.contains('c'));
    ok(!dictionary.contains(obj2));

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);

    ok(comparedDictionary.contains(obj1));
    ok(comparedDictionary.contains(obj1Copy));
    ok(!comparedDictionary.contains({ a: 3 }));
  });
});
