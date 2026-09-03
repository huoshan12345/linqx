import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('IEnumerator.current', () => {
  test('returns the element selected by moveNext', () => {
    const enumerator = Enumerable.from(['a', 'b']).getEnumerator();

    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe('a');
    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe('b');
  });

  test('retains the last current value after natural completion', () => {
    const enumerator = Enumerable.make(1).getEnumerator();

    enumerator.moveNext();
    enumerator.moveNext();

    expect(enumerator.current()).toBe(1);
  });

  test('preserves object identity', () => {
    const value = { id: 1 };
    const enumerator = Enumerable.make(value).getEnumerator();

    enumerator.moveNext();

    expect(enumerator.current()).toBe(value);
  });
});
