import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("singleOrDefault", function () {
    let actual = Enumerable.range(1, 10).singleOrDefault((i) => i * 3 === 6, 4);
    strictEqual(actual, 2);
    actual = Enumerable.range(1, 10).singleOrDefault((i) => i > 13, 40);
    strictEqual(actual, 40);

    strictEqual(Enumerable.range(1, 1).singleOrDefault(), 1);
    strictEqual(Enumerable.range(1, 10).singleOrDefault((i) => i * 3 === 6), 2);
    strictEqual(Enumerable.range(1, 10).singleOrDefault((i) => i > 13), undefined);
    strictEqual(Enumerable.empty().singleOrDefault(), undefined);
  });
});
test('singleOrDefault returns a fallback when no element matches', () => {
  expect(Enumerable.range(1, 3).singleOrDefault(value => value > 9, 10)).toBe(10);
});

test('singleOrDefault rejects more than one matching element', () => {
  expect(() => Enumerable.range(1, 3).singleOrDefault(value => value > 1))
    .toThrow('Sequence contains more than one matching element.');
});
