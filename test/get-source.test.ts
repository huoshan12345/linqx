import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('IGrouping.getSource', () => {
  test('returns the elements stored in the group', () => {
    const group = Enumerable.from([1, 3]).groupBy(() => 'odd').first();

    expect(group.getSource()).toEqual([1, 3]);
  });

  test('returns the same backing array on repeated calls', () => {
    const group = Enumerable.make(1).groupBy(() => 'key').first();

    expect(group.getSource()).toBe(group.getSource());
  });

  test('reflects mutations to the live backing array', () => {
    const group = Enumerable.make(1).groupBy(() => 'key').first();

    group.getSource().push(2);

    expect(group.toArray()).toEqual([1, 2]);
  });
});
