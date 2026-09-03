import { describe } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2, obj2Copy } from './dictionary-fixture.js';
import { equal, test } from '../test-utils.js';

describe('Dictionary', () => {
  test('set', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);
    dictionary.set('a', 1000);
    dictionary.set('b', 2000);
    dictionary.set(obj1, 10000);
    dictionary.set(obj1Copy, 20000);

    equal(dictionary.get('a'), 1000);
    equal(dictionary.get('b'), 2000);
    equal(dictionary.get(obj1), 10000);
    equal(dictionary.get(obj1Copy), 20000);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);
    comparedDictionary.add(obj2Copy, 4);
    comparedDictionary.set(obj1, 10000);
    comparedDictionary.set(obj1Copy, 20000);
    comparedDictionary.set(obj2, 30000);
    comparedDictionary.set(obj2Copy, 40000);

    equal(comparedDictionary.get(obj1), 20000);
    equal(comparedDictionary.get(obj1Copy), 20000);
    equal(comparedDictionary.get(obj2), 40000);
    equal(comparedDictionary.get(obj2Copy), 40000);
  });
});
