import { describe, expect, test } from 'vitest';
import { addObjectEntries, createComparedDictionary, createDictionary } from './dictionary-fixture.js';
import Enumerable from './sut.js';

describe("Aggregate", () => {
  test("count", function () {
    let actual = Enumerable.range(1, 10).count();
    expect(actual).toBe(10);
    actual = Enumerable.empty().count();
    expect(actual).toBe(0);

    actual = Enumerable.range(1, 10).count((i) => i < 5);
    expect(actual).toBe(4);
  });
});

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("count", function () {
    expect(arraySequence.count()).toBe(5);
    expect(emptySequence.count()).toBe(0);
    expect(arraySequence.count((value) => value <= 100)).toBe(3);
    expect(emptySequence.count((value) => value <= 100)).toBe(0);
  });
});

describe('Dictionary', () => {
  test('count', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add('c', 3);
    addObjectEntries(dictionary);
    expect(dictionary.count()).toBe(7);

    dictionary.remove('a');
    expect(dictionary.count()).toBe(6);
    dictionary.clear();
    expect(dictionary.count()).toBe(0);

    const comparedDictionary = createComparedDictionary();
    addObjectEntries(comparedDictionary);
    expect(comparedDictionary.count()).toBe(2);
  });
});
