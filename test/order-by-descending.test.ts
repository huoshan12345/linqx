import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Ordering", () => {
  test("orderByDescending", function () {
    const actual = Enumerable.from([1, 51, 7, 823, 85, 31, 51, 99])
      .orderByDescending((i) => i)
      .toArray();
    expect(actual).toEqual([823, 99, 85, 51, 51, 31, 7, 1]);

    expect(Enumerable.rangeTo(1, 10).orderByDescending((value) => value % 5).toArray()).toEqual([4, 9, 3, 8, 2, 7, 1, 6, 5, 10]);

    const letters = ['b', 'a', 'd', 'c'];
    expect(Enumerable.from(letters)
      .orderByDescending(x => x, (x, y) => x < y ? -1 : +(x > y)).toArray()).toEqual(['d', 'c', 'b', 'a']);
  });
});
test('orderByDescending is stable for equal keys', () => {
  const values = [{ id: 'first', key: 1 }, { id: 'second', key: 1 }];

  expect(Enumerable.from(values).orderByDescending(value => value.key).map(value => value.id))
    .toEqual(['first', 'second']);
});

test('orderByDescending supports a custom comparer', () => {
  expect(Enumerable.from(['a', 'ccc', 'bb'])
    .orderByDescending(value => value, (left, right) => left.length - right.length)
    .toArray())
    .toEqual(['ccc', 'bb', 'a']);
});
