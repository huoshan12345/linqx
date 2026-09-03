import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('createOrderedEnumerable', () => {
  const values = [
    { group: 1, value: 2 },
    { group: 2, value: 1 },
    { group: 1, value: 1 },
  ];

  test('appends an ascending ordering criterion', () => {
    const result = Enumerable.from(values)
      .orderBy(item => item.group)
      .createOrderedEnumerable(item => item.value)
      .map(item => item.value);

    expect(result).toEqual([1, 2, 1]);
  });

  test('appends a descending ordering criterion', () => {
    const result = Enumerable.from(values)
      .orderBy(item => item.group)
      .createOrderedEnumerable(item => item.value, undefined, true)
      .map(item => item.value);

    expect(result).toEqual([2, 1, 1]);
  });

  test('uses a custom comparer', () => {
    const result = Enumerable.from(values)
      .orderBy(item => item.group)
      .createOrderedEnumerable(item => item.value, (left, right) => right - left)
      .map(item => item.value);

    expect(result).toEqual([2, 1, 1]);
  });
});
