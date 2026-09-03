import { describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('Enumerable.Utils.createEnumerable', () => {
  test('adapts an imperative enumerator', () => {
    const sequence = Enumerable.Utils.createEnumerable(
      () => Enumerable.from([1, 2]).getEnumerator(),
    );

    expect(sequence.toArray()).toEqual([1, 2]);
  });

  test('requests a fresh enumerator for each enumeration', () => {
    const factory = vi.fn(() => Enumerable.make(1).getEnumerator());
    const sequence = Enumerable.Utils.createEnumerable(factory);

    sequence.force();
    sequence.force();

    expect(factory).toHaveBeenCalledTimes(2);
  });

  test('disposes the enumerator when a consumer stops early', () => {
    const dispose = vi.fn();
    const sequence = Enumerable.Utils.createEnumerable(() => ({
      current: () => 1,
      moveNext: () => true,
      dispose,
    }));

    sequence.take(1).force();

    expect(dispose).toHaveBeenCalledOnce();
  });
});
