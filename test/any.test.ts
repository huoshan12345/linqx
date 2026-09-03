import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("any", function () {
    expect(arraySequence.any()).toBe(true);
    expect(emptySequence.any()).toBe(false);
    expect(arraySequence.any((value) => value === 100)).toBe(true);
    expect(emptySequence.any((value) => value === 2)).toBe(false);
  });
});

describe("Set", () => {
  test("any", function () {
    const seq = Enumerable.range(1, 10);
    const empty = Enumerable.empty();
    expect(seq.any()).toBe(true);
    expect(empty.any()).toBe(false);
    expect(seq.any((value) => value === 5)).toBe(true);
    expect(seq.any((value) => value === 100)).toBe(false);
  });
});
test('any stops evaluating after the first accepted element', () => {
  const visited: number[] = [];

  const result = Enumerable.range(1, 5).any(value => {
    visited.push(value);
    return value === 3;
  });

  expect(result).toBe(true);
  expect(visited).toEqual([1, 2, 3]);
});
