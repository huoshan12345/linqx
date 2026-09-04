import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("where", function () {
    let actual = Enumerable.range(1, 10).where((i) => i % 2 === 0).toArray();
    expect(actual).toEqual([2, 4, 6, 8, 10]);
    actual = Enumerable.range(1, 10).where((i, index) => (i + index) % 3 === 0).toArray();
    expect(actual).toEqual([2, 5, 8]);
  });
});

describe("WhereSelectEnumerable", () => {
  const seq = Enumerable.range(5, 10);

  test("where", function () {
    expect(seq.where((value) => value % 2 === 0).toArray()).toEqual([6, 8, 10, 12, 14]);
    expect(seq.where((_, index) => index % 2 === 0).toArray()).toEqual([5, 7, 9, 11, 13]);
  });

  test('combines consecutive where calls', () => {
    expect(seq.where(value => value % 2 === 0).where(value => value % 3 === 0).toArray()).toEqual([6, 12]);
    expect(seq.where((_, index) => index % 2 === 0).where((_, index) => index % 2 === 0).toArray()).toEqual([5, 9, 13]);
    expect(seq.where(value => value % 2 === 0).where((_, index) => index % 2 === 0).toArray()).toEqual([6, 10, 14]);
    expect(seq.where((_, index) => index % 2 === 0).where(value => value % 3 === 0).toArray()).toEqual([9]);
  });

  test('applies where after select', () => {
    expect(seq.select(value => value * 2).where(value => value % 2 === 0).toArray()).toEqual([10, 12, 14, 16, 18, 20, 22, 24, 26, 28]);
    expect(seq.select((value, index) => value + index * 2).where(value => value % 2 === 0).toArray()).toEqual([8, 14, 20, 26, 32]);
    expect(seq.select(value => value * 2).where((_, index) => index % 2 === 0).toArray()).toEqual([10, 14, 18, 22, 26]);
    expect(seq.select((value, index) => value + index * 2).where((_, index) => index % 2 === 0).toArray()).toEqual([5, 11, 17, 23, 29]);
  });

  test('applies where after a where-select chain', () => {
    expect(seq.where(value => value % 2 === 0).select(value => value * 2).where(value => value % 3 === 0).toArray()).toEqual([12, 24]);
    expect(seq.where(value => value % 2 === 0)
        .select((value, index) => value + index * 2)
        .where((_, index) => index % 2 === 0)
        .toArray()).toEqual([6, 14, 22]);
    expect(seq.where((_, index) => index % 2 === 0)
        .select(value => value * 2)
        .where((_, index) => index % 2 === 0)
        .toArray()).toEqual([10, 18, 26]);
    expect(seq.where((_, index) => index % 2 === 0)
        .select((value, index) => value + index * 2)
        .where(value => value % 3 === 0)
        .toArray()).toEqual([9, 21]);
  });
});
