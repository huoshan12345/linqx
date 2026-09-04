import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("sequenceEqual", function () {
    expect(arraySequence.sequenceEqual([1, 10, 100, 1000, 10000])).toBe(true);
    expect(arraySequence.sequenceEqual([1, 10, 100, 1000, 10000, 100000])).toBe(false);
    expect(arraySequence.sequenceEqual([1, 10, 100, 1000])).toBe(false);
    expect(arraySequence.sequenceEqual([1, 10, 500, 1000, 10000])).toBe(false);
  });
});

describe("Set", () => {
  test("sequenceEqual", function () {
    expect(Enumerable.from([1, 3, 5, 6, 6, 3, 4, 3, 2, 9]).sequenceEqual([1, 3, 5])).toBe(false);
    expect(Enumerable.range(1, 10).sequenceEqual(Enumerable.range(1, 10))).toBe(true);

    expect(Enumerable.range(1, 10).select((value) => ({ test: value % 3 }))
      .sequenceEqual(Enumerable.range(1, 10).select((value) => ({ test: value % 2 })), (value) => value.test)).toBe(false);

    expect(Enumerable.range(1, 10)
      .select((value) => ({ test: value % 3 }))
      .distinct((value) => value.test)
      .sequenceEqual([{ test: 1 }, { test: 2 }, { test: 0 }], (value) => value.test)).toBe(true);
  });
});
test('sequenceEqual compares projected keys', () => {
  const left = Enumerable.from([{ id: 1 }, { id: 2 }]);
  const right = [{ id: 1 }, { id: 2 }];

  expect(left.sequenceEqual(right, value => value.id)).toBe(true);
});
