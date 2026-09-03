import { describe } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2, obj2Copy } from './dictionary-fixture.js';
import { equal, test } from '../test-utils.js';

describe('Dictionary', () => {
  test('add', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add('c', 3);
    dictionary.add('c', 100);

    equal(dictionary.get('a'), 1);
    equal(dictionary.get('b'), 2);
    equal(dictionary.get('c'), 100);

    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);
    dictionary.add(obj2, 3);
    dictionary.add(obj2Copy, 4);

    equal(dictionary.get(obj1), 1);
    equal(dictionary.get(obj1Copy), 2);
    equal(dictionary.get(obj2), 3);
    equal(dictionary.get(obj2Copy), 4);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);
    comparedDictionary.add(obj2Copy, 4);

    equal(comparedDictionary.get(obj1), 2);
    equal(comparedDictionary.get(obj1Copy), 2);
    equal(comparedDictionary.get(obj2), 4);
    equal(comparedDictionary.get(obj2Copy), 4);
  });
});
