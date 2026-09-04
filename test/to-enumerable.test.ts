import { describe, expect, test } from 'vitest';
import { createDictionary } from './dictionary-fixture.js';
import Enumerable from './sut.js';

describe("Dictionary", () => {
  interface ObjectKey { a: number; }

  const aComparer = function (x: ObjectKey) { return x.a; };

  const obj1 = { a: 1 };

  const obj1_ = { a: 1 };

  const obj2 = { a: 2 };

  const obj2_ = { a: 2 };

  test("toEnumerable", function () {
    const stringDictionary = Enumerable.empty<{ key: string; value: number; }>()
      .toDictionary((entry) => entry.key, (entry) => entry.value);
    stringDictionary.add("a", 1);
    stringDictionary.add("b", 2);
    stringDictionary.add("c", 3);

    const ar = stringDictionary.toEnumerable().orderBy((value) => value.key).toArray();
    expect("a").toBe(ar[0].key);
    expect(1).toBe(ar[0].value);
    expect("b").toBe(ar[1].key);
    expect(2).toBe(ar[1].value);
    expect("c").toBe(ar[2].key);
    expect(3).toBe(ar[2].value);

    const objectDictionary = Enumerable.empty<{ key: ObjectKey; value: number; }>()
      .toDictionary((entry) => entry.key, (entry) => entry.value);
    objectDictionary.add(obj1, 1);
    objectDictionary.add(obj1_, 2);
    objectDictionary.add(obj2, 3);
    objectDictionary.add(obj2_, 4);

    const objectEntries = objectDictionary.toEnumerable().orderBy((value) => value.key.a).toArray();
    expect(obj1).toBe(objectEntries[0].key);
    expect(1).toBe(objectEntries[0].value);
    expect(obj1_).toBe(objectEntries[1].key);
    expect(2).toBe(objectEntries[1].value);
    expect(obj2).toBe(objectEntries[2].key);
    expect(3).toBe(objectEntries[2].value);
    expect(obj2_).toBe(objectEntries[3].key);
    expect(4).toBe(objectEntries[3].value);

    const comparedDictionary = Enumerable.empty<{ key: ObjectKey; value: number; }>()
      .toDictionary((entry) => entry.key, (entry) => entry.value, aComparer);
    comparedDictionary.add(obj1, 1);
    comparedDictionary.add(obj1_, 2);
    comparedDictionary.add(obj2, 3);
    comparedDictionary.add(obj2_, 4);
    const comparedEntries = comparedDictionary.toEnumerable().orderBy((value) => value.key.a).toArray();
    expect(obj1_).toBe(comparedEntries[0].key);
    expect(2).toBe(comparedEntries[0].value);
    expect(obj2_).toBe(comparedEntries[1].key);
    expect(4).toBe(comparedEntries[1].value);
  });
});
test('toEnumerable preserves dictionary insertion order', () => {
  const dictionary = createDictionary();
  dictionary.add('b', 2);
  dictionary.add('a', 1);

  expect(dictionary.toEnumerable().map(entry => entry.key)).toEqual(['b', 'a']);
});

test('toEnumerable reflects dictionary changes made before enumeration', () => {
  const dictionary = createDictionary();
  const entries = dictionary.toEnumerable();
  dictionary.add('a', 1);

  expect(entries.toArray()).toEqual([{ key: 'a', value: 1 }]);
});
