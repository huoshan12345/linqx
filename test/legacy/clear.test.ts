import { describe } from 'vitest';
import { addObjectEntries, createComparedDictionary, createDictionary, obj1, obj2 } from './dictionary-fixture.js';
import { equal, test } from '../test-utils.js';

describe('Dictionary', () => {
  test('clear', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 3);
    dictionary.clear();

    equal(dictionary.get('a'), undefined);
    equal(dictionary.get('b'), undefined);
    equal(dictionary.get(obj1), undefined);
    equal(dictionary.count(), 0);

    const comparedDictionary = createComparedDictionary();
    addObjectEntries(comparedDictionary);
    comparedDictionary.clear();

    equal(comparedDictionary.get(obj1), undefined);
    equal(comparedDictionary.get(obj2), undefined);
    equal(comparedDictionary.count(), 0);
  });
});
