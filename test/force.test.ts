import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Action", () => {
  test("force", function () {
    const actual: number[] = [];
    Enumerable.range(1, 10).doAction(function (i) { actual.push(i); }).force();
    expect(actual).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
test('force returns undefined after consuming the sequence', () => {
  expect(Enumerable.range(1, 3).force()).toBeUndefined();
});

test('force handles an empty sequence', () => {
  expect(() => Enumerable.empty<number>().force()).not.toThrow();
});
