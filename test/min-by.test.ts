import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("minBy", function () {
    const actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).minBy((t) => t.i);
    deepEqual(actual, { v: 1, i: 0 });
  });
});
test('minBy returns the first element when minimum keys tie', () => {
  const first = { id: 'first', score: 1 };
  const second = { id: 'second', score: 1 };

  expect(Enumerable.from([first, second]).minBy(value => value.score)).toBe(first);
});

test('minBy rejects an empty sequence', () => {
  expect(() => Enumerable.empty<number>().minBy(value => value))
    .toThrow('Sequence contains no elements.');
});
