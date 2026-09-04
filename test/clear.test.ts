import { describe, expect, test } from 'vitest';
import { addObjectEntries, createComparedDictionary, createDictionary, obj1, obj2 } from './dictionary-fixture.js';

describe('Dictionary', () => {
  test('clear', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 3);
    dictionary.clear();

    expect(dictionary.get('a')).toBe(undefined);
    expect(dictionary.get('b')).toBe(undefined);
    expect(dictionary.get(obj1)).toBe(undefined);
    expect(dictionary.count()).toBe(0);

    const comparedDictionary = createComparedDictionary();
    addObjectEntries(comparedDictionary);
    comparedDictionary.clear();

    expect(comparedDictionary.get(obj1)).toBe(undefined);
    expect(comparedDictionary.get(obj2)).toBe(undefined);
    expect(comparedDictionary.count()).toBe(0);
  });
});
test('clear is idempotent', () => {
  const dictionary = createDictionary();
  dictionary.add('a', 1);

  dictionary.clear();
  dictionary.clear();

  expect(dictionary.count()).toBe(0);
});

test('clear allows the dictionary to be reused', () => {
  const dictionary = createDictionary();
  dictionary.add('a', 1);
  dictionary.clear();
  dictionary.add('b', 2);

  expect(dictionary.get('b')).toBe(2);
});
