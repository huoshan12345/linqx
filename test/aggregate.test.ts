import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("aggregate", function () {
    strictEqual(Enumerable.range(1, 10).aggregate((a, b) => a + b), 55);
    strictEqual(Enumerable.range(1, 10).aggregate(10, (a, b) => a + b), 65);
    strictEqual(Enumerable.range(1, 10).aggregate(10, (a, b) => a + b, (val) => val * 10), 650);
    strictEqual(Enumerable.range(1, 10).aggregate("", (s, x) => s + x, (value) => 'hoge' + value), "hoge12345678910");
  });
});

test('aggregate returns the seed for an empty sequence', () => {
  expect(Enumerable.empty<number>().aggregate(10, (sum, value) => sum + value)).toBe(10);
});
test('aggregate without a seed rejects an empty sequence', () => {
  expect(() => Enumerable.empty<number>().aggregate((sum, value) => sum + value))
    .toThrow('Sequence contains no elements.');
});
