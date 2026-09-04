import { describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

describe('asEnumerable', () => {
  test('returns the same values through a new sequence wrapper', () => {
    const source = Enumerable.from([1, 2, 3]);
    const result = source.asEnumerable();

    expect(result).not.toBe(source);
    expect(result.toArray()).toEqual([1, 2, 3]);
  });

  test('remains deferred until enumeration', () => {
    const action = vi.fn();
    const sequence = Enumerable.make(1).doAction(action).asEnumerable();

    expect(action).not.toHaveBeenCalled();
    expect(sequence.toArray()).toEqual([1]);
    expect(action).toHaveBeenCalledOnce();
  });

  test('can be enumerated repeatedly when its source is reusable', () => {
    const sequence = Enumerable.range(1, 2).asEnumerable();

    expect(sequence.toArray()).toEqual([1, 2]);
    expect(sequence.toArray()).toEqual([1, 2]);
  });
});
