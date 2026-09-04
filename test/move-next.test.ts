import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('IEnumerator.moveNext', () => {
  test('advances through every source element', () => {
    const enumerator = Enumerable.from([1, 2]).getEnumerator();

    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe(1);
    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe(2);
    expect(enumerator.moveNext()).toBe(false);
  });

  test('continues returning false after completion', () => {
    const enumerator = Enumerable.empty<number>().getEnumerator();

    expect(enumerator.moveNext()).toBe(false);
    expect(enumerator.moveNext()).toBe(false);
  });

  test('propagates errors raised by the source', () => {
    const enumerator = Enumerable.make(1).select(() => {
      throw new Error('failed');
    }).getEnumerator();

    expect(() => enumerator.moveNext()).toThrow('failed');
    expect(enumerator.moveNext()).toBe(false);
  });
});
