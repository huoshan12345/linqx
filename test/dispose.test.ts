import { describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('IEnumerator.dispose', () => {
  test('closes the underlying iterator', () => {
    const finalized = vi.fn();
    const sequence = Enumerable.repeatWithFinalize(() => 1, finalized);
    const enumerator = sequence.getEnumerator();

    enumerator.moveNext();
    enumerator.dispose();

    expect(finalized).toHaveBeenCalledOnce();
  });

  test('is idempotent', () => {
    const finalized = vi.fn();
    const enumerator = Enumerable.repeatWithFinalize(() => 1, finalized).getEnumerator();

    enumerator.moveNext();
    enumerator.dispose();
    enumerator.dispose();

    expect(finalized).toHaveBeenCalledOnce();
  });

  test('prevents further movement', () => {
    const enumerator = Enumerable.range(1, 3).getEnumerator();

    enumerator.dispose();

    expect(enumerator.moveNext()).toBe(false);
  });
});
