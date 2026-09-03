import { describe, expect, test } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2, obj2Copy } from './dictionary-fixture.js';

describe('Dictionary', () => {
  test('add', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add('c', 3);
    dictionary.add('c', 100);

    expect(dictionary.get('a')).toBe(1);
    expect(dictionary.get('b')).toBe(2);
    expect(dictionary.get('c')).toBe(100);

    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);
    dictionary.add(obj2, 3);
    dictionary.add(obj2Copy, 4);

    expect(dictionary.get(obj1)).toBe(1);
    expect(dictionary.get(obj1Copy)).toBe(2);
    expect(dictionary.get(obj2)).toBe(3);
    expect(dictionary.get(obj2Copy)).toBe(4);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);
    comparedDictionary.add(obj2Copy, 4);

    expect(comparedDictionary.get(obj1)).toBe(2);
    expect(comparedDictionary.get(obj1Copy)).toBe(2);
    expect(comparedDictionary.get(obj2)).toBe(4);
    expect(comparedDictionary.get(obj2Copy)).toBe(4);
  });
});
test('add replaces an existing key without increasing the count', () => {
  const dictionary = createDictionary();
  dictionary.add('a', 1);
  dictionary.add('a', 2);

  expect(dictionary.get('a')).toBe(2);
  expect(dictionary.count()).toBe(1);
});

test('add keeps object keys distinct without a comparer', () => {
  const dictionary = createDictionary();
  dictionary.add(obj1, 1);
  dictionary.add(obj1Copy, 2);

  expect(dictionary.count()).toBe(2);
});
