import { describe, expect, test } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2, obj2Copy } from './dictionary-fixture.js';

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

    expect(dictionary.get('a')).toBe(1000);
    expect(dictionary.get('b')).toBe(2000);
    expect(dictionary.get(obj1)).toBe(10000);
    expect(dictionary.get(obj1Copy)).toBe(20000);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);
    comparedDictionary.add(obj2Copy, 4);
    comparedDictionary.set(obj1, 10000);
    comparedDictionary.set(obj1Copy, 20000);
    comparedDictionary.set(obj2, 30000);
    comparedDictionary.set(obj2Copy, 40000);

    expect(comparedDictionary.get(obj1)).toBe(20000);
    expect(comparedDictionary.get(obj1Copy)).toBe(20000);
    expect(comparedDictionary.get(obj2)).toBe(40000);
    expect(comparedDictionary.get(obj2Copy)).toBe(40000);
  });
});
test('set reports whether it replaced an existing key', () => {
  const dictionary = createDictionary();

  expect(dictionary.set('new', 1)).toBe(false);
  expect(dictionary.set('new', 2)).toBe(true);
  expect(dictionary.get('new')).toBe(2);
});

test('set replaces entries through normalized comparison keys', () => {
  const dictionary = createComparedDictionary();

  expect(dictionary.set(obj1, 1)).toBe(false);
  expect(dictionary.set(obj1Copy, 2)).toBe(true);
  expect(dictionary.count()).toBe(1);
});
