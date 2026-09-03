import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Paging", () => {
  test("singleOrDefault", function () {
    let actual = Enumerable.range(1, 10).singleOrDefault((i) => i * 3 === 6, 4);
    expect(actual).toBe(2);
    actual = Enumerable.range(1, 10).singleOrDefault((i) => i > 13, 40);
    expect(actual).toBe(40);

    expect(Enumerable.range(1, 1).singleOrDefault()).toBe(1);
    expect(Enumerable.range(1, 10).singleOrDefault((i) => i * 3 === 6)).toBe(2);
    expect(Enumerable.range(1, 10).singleOrDefault((i) => i > 13)).toBe(undefined);
    expect(Enumerable.empty().singleOrDefault()).toBe(undefined);
  });
});
test('singleOrDefault returns a fallback when no element matches', () => {
  expect(Enumerable.range(1, 3).singleOrDefault(value => value > 9, 10)).toBe(10);
});

test('singleOrDefault rejects more than one matching element', () => {
  expect(() => Enumerable.range(1, 3).singleOrDefault(value => value > 1))
    .toThrow('Sequence contains more than one matching element.');
});
