import { describe, expect, test } from 'vitest';
import { addObjectEntries, createComparedDictionary, createDictionary, obj1, obj1Copy, obj2, obj2Copy } from './dictionary-fixture.js';

describe('Dictionary', () => {
  test('remove', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add('c', 3);
    addObjectEntries(dictionary);

    dictionary.remove('a');
    dictionary.remove(obj1);
    dictionary.remove(obj1Copy);
    dictionary.remove(obj2Copy);

    expect(dictionary.get('a')).toBe(undefined);
    expect(dictionary.get(obj1)).toBe(undefined);
    expect(dictionary.get(obj1Copy)).toBe(undefined);
    expect(dictionary.get(obj2Copy)).toBe(undefined);
    expect(dictionary.count()).toBe(3);

    const comparedDictionary = createComparedDictionary();
    addObjectEntries(comparedDictionary);
    comparedDictionary.remove(obj1);

    expect(comparedDictionary.get(obj1)).toBe(undefined);
    expect(comparedDictionary.get(obj1Copy)).toBe(undefined);
    expect(comparedDictionary.get(obj2)).toBe(4);
    expect(comparedDictionary.count()).toBe(1);
  });
});
test('remove does nothing when the key is absent', () => {
  const dictionary = createDictionary();
  dictionary.add('a', 1);

  dictionary.remove('missing');

  expect(dictionary.count()).toBe(1);
  expect(dictionary.get('a')).toBe(1);
});

test('remove deletes an entry through its normalized comparison key', () => {
  const dictionary = createComparedDictionary();
  dictionary.add(obj1, 1);

  dictionary.remove(obj1Copy);

  expect(dictionary.contains(obj1)).toBe(false);
});
