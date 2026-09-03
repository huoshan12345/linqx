import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, test } from './test-utils.js';

describe("Aggregate", () => {
  test("Max", function () {
    let actual = Enumerable.range(1, 10).max();
    equal(actual, 10);

    actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).max((t) => t.i);
    equal(actual, 9);
  });
});
test('max projects values before comparing them', () => {
  expect(Enumerable.from([{ score: 2 }, { score: 5 }]).max(value => value.score)).toBe(5);
});

test('max returns negative infinity for an empty sequence', () => {
  expect(Enumerable.empty<number>().max()).toBe(-Infinity);
});
