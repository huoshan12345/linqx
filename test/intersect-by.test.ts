import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('intersectBy retains elements selected by a sequence of keys', () => {
  const values = [{ id: 1 }, { id: 2 }, { id: 3 }];

  expect(Enumerable.from(values).intersectBy([3, 1], value => value.id).map(value => value.id))
    .toEqual([1, 3]);
});

test('intersectBy returns only the first source element for each key', () => {
  expect(Enumerable.from([1, 1, 2, 3, 3]).intersectBy([1, 3, 3], value => value).toArray())
    .toEqual([1, 3]);
});

test('intersectBy supports normalized keys', () => {
  expect(Enumerable.from(['A', 'a', 'B', 'c'])
    .intersectBy(['a', 'b'], value => value, key => key.toLowerCase())
    .toArray())
    .toEqual(['A', 'B']);
});
