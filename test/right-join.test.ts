import { expect, test } from 'vitest';
import Enumerable from './sut.js';

test('rightJoin emits null for an unmatched outer element', () => {
  const result = Enumerable.from([2])
    .rightJoin([1, 2], value => value, value => value, (outer, inner) => [outer, inner])
    .toArray();

  expect(result).toEqual([[null, 1], [2, 2]]);
});

test('rightJoin emits every outer match in inner-sequence order', () => {
  const outer = [{ id: 1, value: 'a' }, { id: 1, value: 'b' }];
  const inner = [{ id: 1, value: 'x' }, { id: 2, value: 'y' }];
  const result = Enumerable.from(outer)
    .rightJoin(inner, value => value.id, value => value.id,
      (left, right) => `${left?.value ?? '-'}${right.value}`)
    .toArray();

  expect(result).toEqual(['ax', 'bx', '-y']);
});

test('rightJoin supports normalized keys', () => {
  const result = Enumerable.from(['A'])
    .rightJoin(['a', 'B'], value => value, value => value,
      (outer, inner) => [outer, inner], key => key.toLowerCase())
    .toArray();

  expect(result).toEqual([['A', 'a'], [null, 'B']]);
});
