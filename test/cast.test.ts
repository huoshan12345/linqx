import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('cast', () => {
  test('changes only the compile-time element type', () => {
    const source = Enumerable.from<unknown>([1, 2]);
    const result: Enumerable.IEnumerable<number> = source.cast<number>();

    expect(result.toArray()).toEqual([1, 2]);
  });

  test('returns the original sequence instance', () => {
    const source = Enumerable.from<unknown>([1]);

    expect(source.cast<number>()).toBe(source);
  });

  test('does not perform runtime conversion or validation', () => {
    const result = Enumerable.from<unknown>(['1']).cast<number>().first();

    expect(result).toBe('1');
  });
});
