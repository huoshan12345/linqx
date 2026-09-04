import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("reverse", function () {
    expect(arraySequence.reverse().toArray()).toEqual([10000, 1000, 100, 10, 1]);
    expect(emptySequence.reverse().toArray()).toEqual([]);
  });
});

describe("Ordering", () => {
  test("reverse", function () {
    const actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
      .reverse()
      .toArray();
    expect(actual).toEqual([99, 51, 31, 85, 823, 7, 51, 1]);
  });
});
test('reverse handles an empty sequence', () => {
  expect(Enumerable.empty<number>().reverse().toArray()).toEqual([]);
});
