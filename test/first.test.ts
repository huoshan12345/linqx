import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("first", function () {
    expect(arraySequence.first()).toBe(1);
    expect(arraySequence.first((value) => value >= 100)).toBe(100);
    expect(() => arraySequence.first((value) => value === -1))
      .toThrow('Sequence contains no matching element.');
    expect(() => emptySequence.first())
      .toThrow('Sequence contains no matching element.');
  });
});

describe("Paging", () => {
  test("first", function () {
    let actual = Enumerable.range(1, 10).first();
    expect(actual).toBe(1);
    actual = Enumerable.range(1, 10).first((i) => i * 3 === 6);
    expect(actual).toBe(2);
  });
});
test('first stops enumerating after the first match', () => {
  const visited: number[] = [];

  const result = Enumerable.range(1, 5)
    .doAction(value => {
      visited.push(value);
    })
    .first(value => value > 2);

  expect(result).toBe(3);
  expect(visited).toEqual([1, 2, 3]);
});
