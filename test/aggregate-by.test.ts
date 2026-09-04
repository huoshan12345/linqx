import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('aggregateBy accumulates values independently for each key', () => {
  const values = [
    { category: 'a', amount: 2 },
    { category: 'b', amount: 5 },
    { category: 'a', amount: 3 },
  ];

  expect(Enumerable.from(values)
    .aggregateBy(value => value.category, 10, (sum, value) => sum + value.amount)
    .toArray())
    .toEqual([
      { key: 'a', value: 15 },
      { key: 'b', value: 15 },
    ]);
});

test('aggregateBy supports normalized keys and retains the first original key', () => {
  expect(Enumerable.from(['A', 'a', 'B'])
    .aggregateBy(value => value, '', (result, value) => result + value,
      key => key.toLowerCase())
    .toArray())
    .toEqual([
      { key: 'A', value: 'Aa' },
      { key: 'B', value: 'B' },
    ]);
});

test('aggregateBy is deferred and returns no entries for an empty source', () => {
  const accumulator = vi.fn((sum: number, value: number) => sum + value);
  const sequence = Enumerable.empty<number>().aggregateBy(value => value, 0, accumulator);

  expect(accumulator).not.toHaveBeenCalled();
  expect(sequence.toArray()).toEqual([]);
  expect(accumulator).not.toHaveBeenCalled();
});
