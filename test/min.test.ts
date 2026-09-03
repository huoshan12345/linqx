import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Aggregate", () => {
  test("min", function () {
    let actual = Enumerable.range(1, 10).min();
    expect(actual).toBe(1);

    actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).min((t) => t.i);
    expect(actual).toBe(0);
  });
});
test('min projects values before comparing them', () => {
  expect(Enumerable.from([{ score: 2 }, { score: 5 }]).min(value => value.score)).toBe(2);
});

test('min returns positive infinity for an empty sequence', () => {
  expect(Enumerable.empty<number>().min()).toBe(Infinity);
});
