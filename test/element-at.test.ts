import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("elementAt", function () {
    expect(arraySequence.elementAt(3)).toBe(1000);
    expect(() => arraySequence.elementAt(-1))
      .toThrow('Index is out of range.');
    expect(() => arraySequence.elementAt(100))
      .toThrow('Index is out of range.');
  });
});

describe("Paging", () => {
  test("elementAt", function () {
    const actual = Enumerable.range(1, 10).elementAt(5);
    expect(actual).toBe(6);
  });
});
test('elementAt rejects a negative index', () => {
  expect(() => Enumerable.range(1, 3).elementAt(-1)).toThrow('Index is out of range.');
});
