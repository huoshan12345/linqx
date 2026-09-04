import { describe, expect, test } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';

describe('Dictionary', () => {
  test('get', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add(obj1, 2);

    expect(dictionary.get('a')).toBe(1);
    expect(dictionary.get(obj1)).toBe(2);
    expect(dictionary.get('missing')).toBe(undefined);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);

    expect(comparedDictionary.get(obj1)).toBe(2);
    expect(comparedDictionary.get(obj1Copy)).toBe(2);
    expect(comparedDictionary.get(obj2)).toBe(undefined);
  });
});
test('get distinguishes object keys by identity without a comparer', () => {
  const dictionary = createDictionary();
  dictionary.add(obj1, 1);

  expect(dictionary.get(obj1Copy)).toBeUndefined();
});

test('get observes values replaced through an equal comparison key', () => {
  const dictionary = createComparedDictionary();
  dictionary.add(obj1, 1);
  dictionary.add(obj1Copy, 2);

  expect(dictionary.get(obj1)).toBe(2);
});
