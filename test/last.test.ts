import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("last", function () {
    expect(arraySequence.last()).toBe(10000);
    expect(arraySequence.last((value) => value <= 500)).toBe(100);
    expect(() => arraySequence.last((value) => value === -1))
      .toThrow('Sequence contains no matching element.');
    expect(() => emptySequence.last())
      .toThrow('Sequence contains no matching element.');
  });
});

describe("Paging", () => {
  test("last", function () {
    let actual = Enumerable.range(1, 10).last();
    expect(actual).toBe(10);

    actual = Enumerable.range(1, 10).last((i) => i < 6);
    expect(actual).toBe(5);
  });
});
test('last evaluates the complete sequence before returning the final match', () => {
  const visited: number[] = [];
  const result = Enumerable.range(1, 4).doAction(value => {
    visited.push(value);
  }).last(value => value < 3);

  expect(result).toBe(2);
  expect(visited).toEqual([1, 2, 3, 4]);
});
