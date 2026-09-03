import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Aggregate", () => {
  test("maxBy", function () {
    const actual = Enumerable.range(1, 10).select((v, i) => ({ v: v, i: i })).maxBy((t) => t.i);
    deepEqual(actual, { v: 10, i: 9 });
  });
});
test('maxBy returns the first element when maximum keys tie', () => {
  const first = { id: 'first', score: 10 };
  const second = { id: 'second', score: 10 };

  expect(Enumerable.from([first, second]).maxBy(value => value.score)).toBe(first);
});

test('maxBy rejects an empty sequence', () => {
  expect(() => Enumerable.empty<number>().maxBy(value => value))
    .toThrow('Sequence contains no elements.');
});
