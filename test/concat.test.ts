import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Set", () => {
  test("concat", function () {
    const actual = Enumerable.range(1, 3).concat([20, 21, 22]).toArray();
    deepEqual(actual, [1, 2, 3, 20, 21, 22]);


    deepEqual(Enumerable.range(1, 3).concat([]).toArray(), [1, 2, 3]);
    deepEqual(Enumerable.range(1, 3).concat([2, 3], [4, 5]).toArray(), [1, 2, 3, 2, 3, 4, 5]);
    const range = Enumerable.rangeTo(3, 5);
    deepEqual(range.concat(range, range, range, range).toArray(), Enumerable.repeat(range, 5).selectMany((value) => value).toArray());
  });
});
test('concat appends multiple iterable and array-like sources in order', () => {
  const arrayLike = { 0: 4, 1: 5, length: 2 };

  expect(Enumerable.make(1).concat([2, 3], arrayLike).toArray())
    .toEqual([1, 2, 3, 4, 5]);
});

test('concat preserves an empty source and empty additions', () => {
  expect(Enumerable.empty<number>().concat([], Enumerable.empty()).toArray()).toEqual([]);
});
