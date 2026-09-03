import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Aggregate", () => {
  test("average", function () {
    expect(Enumerable.range(1, 10).average()).toBe(5.5);
    expect(Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).average((t) => t.i)).toBe(4.5);
  });
});
test('average projects source elements before calculating the mean', () => {
  expect(Enumerable.from([{ value: 2 }, { value: 6 }]).average(item => item.value)).toBe(4);
});

test('average returns NaN for an empty sequence', () => {
  expect(Enumerable.empty<number>().average()).toBeNaN();
});
