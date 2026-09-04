import { afterEach, describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('weightedSample', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('selects the first weighted interval when Math.random returns zero', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(Enumerable.from(['a', 'b'])
      .weightedSample(value => value === 'a' ? 1 : 3)
      .take(3)
      .toArray())
      .toEqual(['a', 'a', 'a']);
  });

  test('selects a later weighted interval when the random value falls within it', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);

    expect(Enumerable.from(['a', 'b'])
      .weightedSample(value => value === 'a' ? 1 : 3)
      .first())
      .toBe('b');
  });

  test('treats negative weights as zero', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(Enumerable.from(['ignored', 'selected'])
      .weightedSample(value => value === 'ignored' ? -10 : 1)
      .take(2)
      .toArray())
      .toEqual(['selected', 'selected']);
  });

  test('returns an empty sequence when the total weight is zero', () => {
    expect(Enumerable.from([1, 2]).weightedSample(() => 0).toArray()).toEqual([]);
  });
});
