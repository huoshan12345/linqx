import { describe } from 'vitest';
import Enumerable from './sut.js';
import { strictEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("average", function () {
    strictEqual(Enumerable.range(1, 10).average(), 5.5);
    strictEqual(Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).average((t) => t.i), 4.5);
  });
});
test('average projects source elements before calculating the mean', () => {
  expect(Enumerable.from([{ value: 2 }, { value: 6 }]).average(item => item.value)).toBe(4);
});

test('average returns NaN for an empty sequence', () => {
  expect(Enumerable.empty<number>().average()).toBeNaN();
});
