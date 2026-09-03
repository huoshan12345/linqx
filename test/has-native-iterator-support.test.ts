import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('Enumerable.Utils.hasNativeIteratorSupport', () => {
  test('reports support in the current runtime', () => {
    expect(Enumerable.Utils.hasNativeIteratorSupport()).toBe(true);
  });

  test('returns a boolean', () => {
    expect(typeof Enumerable.Utils.hasNativeIteratorSupport()).toBe('boolean');
  });

  test('returns the same result across calls', () => {
    expect(Enumerable.Utils.hasNativeIteratorSupport())
      .toBe(Enumerable.Utils.hasNativeIteratorSupport());
  });
});
