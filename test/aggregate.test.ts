import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Aggregate", () => {
  test("aggregate", function () {
    expect(Enumerable.range(1, 10).aggregate((a, b) => a + b)).toBe(55);
    expect(Enumerable.range(1, 10).aggregate(10, (a, b) => a + b)).toBe(65);
    expect(Enumerable.range(1, 10).aggregate(10, (a, b) => a + b, (val) => val * 10)).toBe(650);
    expect(Enumerable.range(1, 10).aggregate("", (s, x) => s + x, (value) => 'hoge' + value)).toBe("hoge12345678910");
  });
});

test('aggregate returns the seed for an empty sequence', () => {
  expect(Enumerable.empty<number>().aggregate(10, (sum, value) => sum + value)).toBe(10);
});
test('aggregate without a seed rejects an empty sequence', () => {
  expect(() => Enumerable.empty<number>().aggregate((sum, value) => sum + value))
    .toThrow('Sequence contains no elements.');
});
