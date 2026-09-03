import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('IGrouping.key', () => {
  test('returns the selected group key', () => {
    expect(Enumerable.make('value').groupBy(() => 'key').first().key()).toBe('key');
  });

  test('keeps the first original key when comparison keys are normalized', () => {
    const group = Enumerable.from(['A', 'a'])
      .groupBy(
        value => value,
        value => value,
        (_, elements) => elements as Enumerable.IGrouping<string, string>,
        value => value.toLowerCase(),
      )
      .first();

    expect(group.key()).toBe('A');
  });

  test('preserves object-key identity', () => {
    const key = { id: 1 };
    const group = Enumerable.make(1).groupBy(() => key).first();

    expect(group.key()).toBe(key);
  });
});
