import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("pairwise", function () {
    const actual = Enumerable.range(1, 4).pairwise((prev, next) => ({ p: prev, n: next })).toArray();
    expect(actual).toEqual([{ p: 1, n: 2 }, { p: 2, n: 3 }, { p: 3, n: 4 }]);
  });
});
test('pairwise returns no values for empty and single-element sequences', () => {
  expect(Enumerable.empty<number>().pairwise((left, right) => left + right).toArray()).toEqual([]);
  expect(Enumerable.make(1).pairwise((left, right) => left + right).toArray()).toEqual([]);
});

test('pairwise preserves pair order', () => {
  expect(Enumerable.from(['a', 'b', 'c']).pairwise((left, right) => left + right).toArray())
    .toEqual(['ab', 'bc']);
});
