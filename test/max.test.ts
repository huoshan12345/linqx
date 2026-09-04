import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Aggregate", () => {
  test("Max", function () {
    let actual = Enumerable.range(1, 10).max();
    expect(actual).toBe(10);

    actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).max((t) => t.i);
    expect(actual).toBe(9);
  });
});
test('max projects values before comparing them', () => {
  expect(Enumerable.from([{ score: 2 }, { score: 5 }]).max(value => value.score)).toBe(5);
});

test('max returns negative infinity for an empty sequence', () => {
  expect(Enumerable.empty<number>().max()).toBe(-Infinity);
});
