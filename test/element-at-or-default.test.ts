import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("ArrayEnumerable", () => {
  const arraySequence = Enumerable.from([1, 10, 100, 1000, 10000]);

  test("elementAtOrDefault", function () {
    expect(arraySequence.elementAtOrDefault(4)).toBe(10000);
    expect(arraySequence.elementAtOrDefault(-1, -100)).toBe(-100);
    expect(arraySequence.elementAtOrDefault(5, -100)).toBe(-100);
  });
});

describe("Paging", () => {
  test("elementAtOrDefault", function () {
    let actual = Enumerable.range(1, 10).elementAtOrDefault(3, 0);
    expect(actual).toBe(4);
    actual = Enumerable.range(1, 10).elementAtOrDefault(31, 0);
    expect(actual).toBe(0);

    const mixedSequence = Enumerable.from<number | string>([1, 2, 3, 4]);
    expect(mixedSequence.elementAtOrDefault(3, "foo")).toBe(4);
    expect(mixedSequence.elementAtOrDefault(31, "foo")).toBe("foo");
  });
});
test('elementAtOrDefault returns undefined when no fallback is supplied', () => {
  expect(Enumerable.make(1).elementAtOrDefault(2)).toBeUndefined();
});
