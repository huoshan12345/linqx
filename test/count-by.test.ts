import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('countBy counts each key and preserves first-key order', () => {
  const result: Enumerable.KeyValuePair<string, number>[] =
    Enumerable.from(['odd', 'even', 'odd', 'odd', 'even'])
      .countBy(value => value)
      .toArray();

  expect(result).toEqual([
    { key: 'odd', value: 3 },
    { key: 'even', value: 2 },
  ]);
});

test('countBy supports normalized keys and retains the first original key', () => {
  expect(Enumerable.from(['A', 'a', 'B'])
    .countBy(value => value, key => key.toLowerCase())
    .toArray())
    .toEqual([
      { key: 'A', value: 2 },
      { key: 'B', value: 1 },
    ]);
});

test('countBy is deferred and handles an empty source', () => {
  const keySelector = vi.fn((value: number) => value % 2);
  const sequence = Enumerable.empty<number>().countBy(keySelector);

  expect(keySelector).not.toHaveBeenCalled();
  expect(sequence.toArray()).toEqual([]);
  expect(keySelector).not.toHaveBeenCalled();
});
