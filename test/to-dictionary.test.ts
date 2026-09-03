import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Convert", () => {
  test("toDictionary", function () {
    const dictionary = Enumerable.range(1, 3).toDictionary((i) => 'foo' + i, (i) => i * 4);
    expect(4).toBe(dictionary.get("foo1"));
    expect(8).toBe(dictionary.get("foo2"));
    expect(12).toBe(dictionary.get("foo3"));

    const comparedDictionary = Enumerable.range(1, 3).toDictionary((i) => ({ key: i, V: 'foo' + i }), (i) => i * 4, (value) => value.key);
    expect(4).toBe(comparedDictionary.get({ key: 1, V: 'ignored' }));
    expect(8).toBe(comparedDictionary.get({ key: 2, V: 'ignored' }));
    expect(12).toBe(comparedDictionary.get({ key: 3, V: 'ignored' }));
  });
});
test('toDictionary keeps the last value for duplicate comparison keys', () => {
  const dictionary = Enumerable.from([
    { key: 'A', value: 1 },
    { key: 'a', value: 2 },
  ]).toDictionary(item => item.key, item => item.value, key => key.toLowerCase());

  expect(dictionary.count()).toBe(1);
  expect(dictionary.get('A')).toBe(2);
});

test('toDictionary creates an empty dictionary from an empty source', () => {
  expect(Enumerable.empty<number>().toDictionary(value => value).count()).toBe(0);
});
