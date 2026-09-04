import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('exceptBy excludes elements by a sequence of keys', () => {
  const values = [{ id: 1 }, { id: 2 }, { id: 3 }];

  expect(Enumerable.from(values).exceptBy([2], value => value.id).map(value => value.id))
    .toEqual([1, 3]);
});

test('exceptBy returns each remaining key only once in source order', () => {
  expect(Enumerable.from([1, 1, 2, 3, 3]).exceptBy([2], value => value).toArray())
    .toEqual([1, 3]);
});

test('exceptBy supports normalized keys', () => {
  expect(Enumerable.from(['A', 'b', 'B', 'c'])
    .exceptBy(['a'], value => value, key => key.toLowerCase())
    .toArray())
    .toEqual(['b', 'c']);
});
