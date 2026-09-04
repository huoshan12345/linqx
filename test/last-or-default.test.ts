import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  const emptySequence = Enumerable.from([]);

  test("lastOrDefault", function () {
    // No arguments.
    expect(arraySequence.lastOrDefault()).toBe(10000);
    expect(emptySequence.lastOrDefault()).toBe(undefined);

    // No predicate.
    expect(arraySequence.lastOrDefault(0)).toBe(10000);
    expect(emptySequence.lastOrDefault(0)).toBe(0);
    expect(emptySequence.lastOrDefault(undefined)).toBe(undefined);

    // No default value.
    expect(arraySequence.lastOrDefault(() => true)).toBe(10000);
    expect(emptySequence.lastOrDefault(() => true)).toBe(undefined);

    // Both arguments.
    expect(arraySequence.lastOrDefault(() => true, 0)).toBe(10000);
    expect(emptySequence.lastOrDefault(() => true, 0)).toBe(0);
    expect(emptySequence.lastOrDefault(() => true, null)).toBe(null);
    expect(emptySequence.lastOrDefault(() => true, undefined)).toBe(undefined);
  });
});

describe("Paging", () => {
  test("lastOrDefault", function () {
    const nonEmpty = Enumerable.range(1, 10);
    const empty = Enumerable.empty();

    // No arguments.
    expect(nonEmpty.lastOrDefault()).toBe(10);
    expect(empty.lastOrDefault()).toBe(undefined);

    // No predicate.
    expect(nonEmpty.lastOrDefault(0)).toBe(10);
    expect(empty.lastOrDefault(0)).toBe(0);
    expect(empty.lastOrDefault(undefined)).toBe(undefined);

    // No default value.
    expect(nonEmpty.lastOrDefault(() => true)).toBe(10);
    expect(empty.lastOrDefault(() => true)).toBe(undefined);

    // Both arguments.
    expect(nonEmpty.lastOrDefault(() => true, 0)).toBe(10);
    expect(empty.lastOrDefault(() => true, 0)).toBe(0);
    expect(empty.lastOrDefault(() => true, null)).toBe(null);
    expect(empty.lastOrDefault(() => true, undefined)).toBe(undefined);
  });
});
test('lastOrDefault returns undefined when no value or fallback exists', () => {
  expect(Enumerable.empty<number>().lastOrDefault()).toBeUndefined();
});
