import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Set", () => {
  test("insert", function () {
    const actual = Enumerable.range(1, 5).insert(3, [20, 21, 22]).toArray();
    expect(actual).toEqual([1, 2, 3, 20, 21, 22, 4, 5]);
  });
});
test('insert can prepend and append a sequence', () => {
  expect(Enumerable.from([2, 3]).insert(0, [1]).toArray()).toEqual([1, 2, 3]);
  expect(Enumerable.from([1, 2]).insert(2, [3]).toArray()).toEqual([1, 2, 3]);
});

test('insert appends when the index is negative or beyond the source', () => {
  expect(Enumerable.from([1, 2]).insert(-1, [3]).toArray()).toEqual([1, 2, 3]);
  expect(Enumerable.from([1, 2]).insert(99, [3]).toArray()).toEqual([1, 2, 3]);
});
