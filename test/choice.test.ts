import { afterEach, describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('choice', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('selects the first candidate when Math.random returns zero', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);

    expect(Enumerable.choice('first', 'last').take(3).toArray())
      .toEqual(['first', 'first', 'first']);
  });

  test('selects the last candidate when Math.random approaches one', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.999);

    expect(Enumerable.choice('first', 'last').take(2).toArray())
      .toEqual(['last', 'last']);
  });

  test('returns an empty sequence when no candidates are supplied', () => {
    expect(Enumerable.choice<number>().toArray()).toEqual([]);
  });
});
