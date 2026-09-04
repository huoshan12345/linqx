import { describe, expect, test, vi } from 'vitest';
import Enumerable from './sut.js';

interface Yielder<T> {
  yieldReturn(value: T): boolean;
  yieldBreak(): boolean;
}

describe('Enumerable.Utils.createEnumerator', () => {
  test('initializes lazily and yields current values', () => {
    const initialize = vi.fn();
    let value = 0;
    const enumerator = Enumerable.Utils.createEnumerator<number>(
      initialize,
      function (this: Yielder<number>) {
        value++;
        return value <= 2 ? this.yieldReturn(value) : this.yieldBreak();
      },
      () => undefined,
    );

    expect(initialize).not.toHaveBeenCalled();
    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe(1);
    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe(2);
    expect(enumerator.moveNext()).toBe(false);
    expect(initialize).toHaveBeenCalledOnce();
  });

  test('disposes after natural completion', () => {
    const dispose = vi.fn();
    const enumerator = Enumerable.Utils.createEnumerator(
      () => undefined,
      () => false,
      dispose,
    );

    expect(enumerator.moveNext()).toBe(false);
    expect(dispose).toHaveBeenCalledOnce();
  });

  test('disposes and rethrows when advancing fails', () => {
    const dispose = vi.fn();
    const enumerator = Enumerable.Utils.createEnumerator(
      () => undefined,
      () => {
        throw new Error('failed');
      },
      dispose,
    );

    expect(() => enumerator.moveNext()).toThrow('failed');
    expect(dispose).toHaveBeenCalledOnce();
    expect(enumerator.moveNext()).toBe(false);
  });
});
