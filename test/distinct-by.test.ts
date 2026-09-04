import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('distinctBy retains the first element for each key', () => {
  const values = [
    { id: 1, name: 'first' },
    { id: 1, name: 'second' },
    { id: 2, name: 'third' },
  ];

  expect(Enumerable.from(values).distinctBy(value => value.id).map(value => value.name))
    .toEqual(['first', 'third']);
});

test('distinctBy supports normalized keys', () => {
  expect(Enumerable.from(['A', 'a', 'B'])
    .distinctBy(value => value, key => key.toLowerCase())
    .toArray())
    .toEqual(['A', 'B']);
});

test('distinctBy is deferred and evaluates one key per source element', () => {
  const keySelector = vi.fn((value: number) => value % 2);
  const sequence = Enumerable.from([1, 2, 3]).distinctBy(keySelector);

  expect(keySelector).not.toHaveBeenCalled();
  expect(sequence.toArray()).toEqual([1, 2]);
  expect(keySelector).toHaveBeenCalledTimes(3);
});
