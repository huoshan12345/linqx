import { afterEach, describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('shuffle', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('uses Fisher-Yates swaps driven by Math.random', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(Enumerable.from([1, 2, 3]).shuffle().toArray()).toEqual([2, 3, 1]);
  });

  test('preserves every source element', () => {
    vi.spyOn(Math, 'random').mockReturnValueOnce(0.8).mockReturnValueOnce(0.2);

    const result = Enumerable.from([1, 1, 2, 3]).shuffle().toArray();

    expect(result.toSorted()).toEqual([1, 1, 2, 3]);
  });

  test('handles empty and single-element sequences', () => {
    expect(Enumerable.empty<number>().shuffle().toArray()).toEqual([]);
    expect(Enumerable.make(5).shuffle().toArray()).toEqual([5]);
  });
});
