import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('unionBy retains the first element for each key across both sequences', () => {
  const first = [{ id: 1, source: 'first' }, { id: 2, source: 'first' }];
  const second = [{ id: 2, source: 'second' }, { id: 3, source: 'second' }];

  expect(Enumerable.from(first).unionBy(second, value => value.id).map(value => value.source))
    .toEqual(['first', 'first', 'second']);
});

test('unionBy supports normalized keys', () => {
  expect(Enumerable.from(['A'])
    .unionBy(['a', 'B'], value => value, key => key.toLowerCase())
    .toArray())
    .toEqual(['A', 'B']);
});

test('unionBy preserves first-occurrence order and removes duplicates within each source', () => {
  expect(Enumerable.from([2, 1, 2]).unionBy([1, 3, 3], value => value).toArray())
    .toEqual([2, 1, 3]);
});
