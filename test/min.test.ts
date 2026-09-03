import { describe } from 'vitest';
import Enumerable from './sut.js';
import { equal, test } from './test-utils.js';

describe("Aggregate", () => {
  test("min", function () {
    let actual = Enumerable.range(1, 10).min();
    equal(actual, 1);

    actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).min((t) => t.i);
    equal(actual, 0);
  });
});
test('min projects values before comparing them', () => {
  expect(Enumerable.from([{ score: 2 }, { score: 5 }]).min(value => value.score)).toBe(2);
});

test('min returns positive infinity for an empty sequence', () => {
  expect(Enumerable.empty<number>().min()).toBe(Infinity);
});
