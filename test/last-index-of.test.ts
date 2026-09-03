import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("lastIndexOf", function () {
    const actual = Enumerable.from([1, 2, 3, 2, 5]).lastIndexOf(2);
    strictEqual(actual, 3);

    strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).lastIndexOf(3), 4);
    strictEqual(Enumerable.from([1, 2, 3, 3, 3, 4, 5]).lastIndexOf(function (x) { return x === 3; }), 4);
  });
});
test('lastIndexOf returns minus one when no element matches', () => {
  expect(Enumerable.from([1, 2, 3]).lastIndexOf(9)).toBe(-1);
  expect(Enumerable.empty<number>().lastIndexOf(() => true)).toBe(-1);
});

test('lastIndexOf passes the current index to a predicate', () => {
  expect(Enumerable.from(['a', 'a', 'a']).lastIndexOf((_, index) => index < 2)).toBe(1);
});
