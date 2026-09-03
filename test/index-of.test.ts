import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("indexOf", function () {
    const actual = Enumerable.range(1, 10).indexOf(3);
    strictEqual(actual, 2);

    strictEqual(Enumerable.from([1, 10, 100, 1000, 100, 100]).indexOf(100), 2);

    strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).indexOf(3), 2);
    strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).indexOf(function (x) { return x === 3; }), 2);
  });
});
test('indexOf returns minus one when no element matches', () => {
  expect(Enumerable.from([1, 2, 3]).indexOf(9)).toBe(-1);
  expect(Enumerable.from([1, 2, 3]).indexOf(value => value > 9)).toBe(-1);
});

test('indexOf passes the current index to a predicate', () => {
  expect(Enumerable.from(['a', 'a', 'a']).indexOf((_, index) => index === 2)).toBe(2);
});
