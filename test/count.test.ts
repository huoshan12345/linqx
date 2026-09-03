import { describe } from 'vitest';
import { addObjectEntries, createComparedDictionary, createDictionary } from './dictionary-fixture.js';
import Enumerable from './sut.js';
import { equal, test } from './test-utils.js';

describe("Aggregate", () => {
  test("count", function () {
    let actual = Enumerable.range(1, 10).count();
    equal(actual, 10);
    actual = Enumerable.empty().count();
    equal(actual, 0);

    actual = Enumerable.range(1, 10).count((i) => i < 5);
    equal(actual, 4);
  });
});

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("count", function () {
    equal(arraySequence.count(), 5);
    equal(emptySequence.count(), 0);
    equal(arraySequence.count((value) => value <= 100), 3);
    equal(emptySequence.count((value) => value <= 100), 0);
  });
});

describe('Dictionary', () => {
  test('count', () => {
    const dictionary = createDictionary();
    dictionary.add('a', 1);
    dictionary.add('b', 2);
    dictionary.add('c', 3);
    addObjectEntries(dictionary);
    equal(dictionary.count(), 7);

    dictionary.remove('a');
    equal(dictionary.count(), 6);
    dictionary.clear();
    equal(dictionary.count(), 0);

    const comparedDictionary = createComparedDictionary();
    addObjectEntries(comparedDictionary);
    equal(comparedDictionary.count(), 2);
  });
});
