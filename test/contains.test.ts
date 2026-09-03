import { describe, expect, test } from 'vitest';
import { createComparedDictionary, createDictionary, obj1, obj1Copy, obj2 } from './dictionary-fixture.js';
import Enumerable from './sut.js';

describe("Set", () => {
  test("contains", function () {
    const numbers = Enumerable.range(1, 10);
    expect(numbers.contains(5)).toBe(true);
    expect(numbers.contains(13)).toBe(false);
  });
});

describe('Dictionary', () => {
  test('contains', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add(obj1, 1);
    dictionary.add(obj1Copy, 2);

    expect(dictionary.contains('a')).toBe(true);
    expect(dictionary.contains('b')).toBe(true);
    expect(dictionary.contains(obj1)).toBe(true);
    expect(dictionary.contains(obj1Copy)).toBe(true);
    expect(dictionary.contains('c')).toBe(false);
    expect(dictionary.contains(obj2)).toBe(false);

    const comparedDictionary = createComparedDictionary();
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1Copy, 2);
    comparedDictionary.add(obj2, 3);

    expect(comparedDictionary.contains(obj1)).toBe(true);
    expect(comparedDictionary.contains(obj1Copy)).toBe(true);
    expect(comparedDictionary.contains({ a: 3 })).toBe(false);
  });
});
test('contains uses a comparison selector for structural keys', () => {
  const values = Enumerable.from([{ id: 1 }, { id: 2 }]);

  expect(values.contains({ id: 2 }, value => value.id)).toBe(true);
  expect(values.contains({ id: 3 }, value => value.id)).toBe(false);
});
