import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe('getEnumerator', () => {
  test('creates an enumerator positioned before the first element', () => {
    const enumerator = Enumerable.from([1, 2]).getEnumerator();

    expect(enumerator.moveNext()).toBe(true);
    expect(enumerator.current()).toBe(1);
  });

  test('creates independent enumerators for reusable sources', () => {
    const sequence = Enumerable.range(1, 2);
    const first = sequence.getEnumerator();
    const second = sequence.getEnumerator();

    first.moveNext();
    second.moveNext();

    expect(first.current()).toBe(1);
    expect(second.current()).toBe(1);
  });

  test('returns a completed enumerator for an empty sequence', () => {
    expect(Enumerable.empty<number>().getEnumerator().moveNext()).toBe(false);
  });
});
