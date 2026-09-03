import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Ordering", () => {
  test("orderBy", function () {
    const actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
      .orderBy((i) => i)
      .toArray();
    deepEqual(actual, [1, 7, 31, 51, 51, 85, 99, 823]);

    deepEqual(Enumerable.rangeTo(10, 1).orderBy((value) => value % 5).toArray(), [10, 5, 6, 1, 7, 2, 8, 3, 9, 4]);

    const letters = ['b', 'a', 'd', 'c'];
    deepEqual(Enumerable.from(letters).orderBy(x => x, (x, y) => x.localeCompare(y)).toArray(), ['a', 'b', 'c', 'd']);
    deepEqual(Enumerable.from(letters).orderBy(x => x, (x, y) => (x < y) ? 1 : (x === y) ? 0 : -1).toArray(), ['d', 'c', 'b', 'a']);
    deepEqual(Enumerable.from(letters).orderBy(x => x, (x, y) => (x < y) ? 1 : -1).toArray(), ['d', 'c', 'b', 'a']);
  });
});
test('orderBy is stable for equal keys', () => {
  const values = [{ id: 'first', key: 1 }, { id: 'second', key: 1 }];

  expect(Enumerable.from(values).orderBy(value => value.key).map(value => value.id))
    .toEqual(['first', 'second']);
});

test('orderBy handles an empty sequence', () => {
  expect(Enumerable.empty<number>().orderBy(value => value).toArray()).toEqual([]);
});
