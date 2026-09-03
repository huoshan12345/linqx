import { describe } from 'vitest';
import Enumerable from '../../index.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from '../test-utils.js';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';

describe("Set", () => {
  test("contains", function () {
      const numbers = Enumerable.range(1, 10);
      ok(numbers.contains(5));
      ok(!numbers.contains(13));
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
