import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Paging", () => {
  test("skipWhile", function () {
    let actual = Enumerable.range(1, 10).skipWhile((i) => i < 8).toArray();
    deepEqual(actual, [8, 9, 10]);

    actual = Enumerable.range(1, 10).skipWhile((_, i) => i < 8).toArray();
    deepEqual(actual, [9, 10]);
  });
});
test('skipWhile passes source indexes only until skipping ends', () => {
  const indexes: number[] = [];
  const result = Enumerable.from([10, 20, 30, 40])
    .skipWhile((_, index) => {
      indexes.push(index);
      return index < 2;
    })
    .toArray();

  expect(result).toEqual([30, 40]);
  expect(indexes).toEqual([0, 1, 2]);
});

test('skipWhile handles predicates that accept all or no elements', () => {
  expect(Enumerable.range(1, 3).skipWhile(() => true).toArray()).toEqual([]);
  expect(Enumerable.range(1, 3).skipWhile(() => false).toArray()).toEqual([1, 2, 3]);
});
