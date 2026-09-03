import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("firstOrDefault", function () {
    // No arguments.
    expect(arraySequence.firstOrDefault()).toBe(1);
    expect(emptySequence.firstOrDefault()).toBe(undefined);

    // No predicate.
    expect(arraySequence.firstOrDefault(0)).toBe(1);
    expect(emptySequence.firstOrDefault(0)).toBe(0);
    expect(emptySequence.firstOrDefault(undefined)).toBe(undefined);

    // No default value.
    expect(arraySequence.firstOrDefault(() => true)).toBe(1);
    expect(emptySequence.firstOrDefault(() => true)).toBe(undefined);

    // Both arguments.
    expect(arraySequence.firstOrDefault(() => true, 0)).toBe(1);
    expect(emptySequence.firstOrDefault(() => true, 0)).toBe(0);
    expect(emptySequence.firstOrDefault(() => true, null)).toBe(null);
    expect(emptySequence.firstOrDefault(() => true, undefined)).toBe(undefined);
  });
});

describe("Paging", () => {
  test("firstOrDefault", function () {
    const nonEmpty = Enumerable.range(1, 10);
    const empty = Enumerable.empty();

    // No arguments.
    expect(nonEmpty.firstOrDefault()).toBe(1);
    expect(empty.firstOrDefault()).toBe(undefined);

    // No predicate.
    expect(nonEmpty.firstOrDefault(0)).toBe(1);
    expect(empty.firstOrDefault(0)).toBe(0);
    expect(empty.firstOrDefault(undefined)).toBe(undefined);

    // No default value.
    expect(nonEmpty.firstOrDefault(() => true)).toBe(1);
    expect(empty.firstOrDefault(() => true)).toBe(undefined);

    // Both arguments.
    expect(nonEmpty.firstOrDefault(() => true, 0)).toBe(1);
    expect(empty.firstOrDefault(() => true, 0)).toBe(0);
    expect(empty.firstOrDefault(() => true, null)).toBe(null);
    expect(empty.firstOrDefault(() => true, undefined)).toBe(undefined);
  });
});
test('firstOrDefault returns undefined when no value or fallback exists', () => {
  expect(Enumerable.empty<number>().firstOrDefault()).toBeUndefined();
});
