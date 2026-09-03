import { describe } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';
import { equal, test } from '../test-utils.js';

describe('Dictionary', () => {
  test('get', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add(obj1, 2);

    equal(dictionary.get('a'), 1);
    equal(dictionary.get(obj1), 2);
    equal(dictionary.get('missing'), undefined);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);

    equal(comparedDictionary.get(obj1), 2);
    equal(comparedDictionary.get(obj1Copy), 2);
    equal(comparedDictionary.get(obj2), undefined);
  });
});
