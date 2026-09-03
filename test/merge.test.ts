import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("merge", function () {
    expect(Enumerable.from([1, 2, 3]).merge([-3, 4, 10]).toArray()).toEqual([1, -3, 2, 4, 3, 10]);

    expect(Enumerable.from([1, 2, 3]).merge([-3, 4], [-7, 20, 30, 100]).toArray()).toEqual([1, -3, -7, 2, 4, 20, 3, 30, 100]);
  });
});
test('merge interleaves uneven sequences until all are exhausted', () => {
  expect(Enumerable.from([1, 2, 3]).merge([10], [20, 21]).toArray())
    .toEqual([1, 10, 20, 2, 21, 3]);
});

test('merge handles empty input sequences', () => {
  expect(Enumerable.empty<number>().merge([], [1, 2]).toArray()).toEqual([1, 2]);
});
