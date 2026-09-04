import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("select", function () {
    let actual = Enumerable.range(1, 10).select((i) => i * 10).toArray();
    expect(actual).toEqual([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
    actual = Enumerable.range(1, 10).select((i, index) => i * 10 + index).toArray();
    expect(actual).toEqual([10, 21, 32, 43, 54, 65, 76, 87, 98, 109]);
  });
});

describe("WhereSelectEnumerable", () => {
  const seq = Enumerable.range(5, 10);

  // 5-14
  const seq2 = Enumerable.range(5, 5);

  test("select", function () {
    expect(seq2.select((value) => value * 10).toArray()).toEqual([50, 60, 70, 80, 90]);
    expect(seq2.select((_value, index) => index * 2).toArray()).toEqual([0, 2, 4, 6, 8]);
  });

  test('combines consecutive select calls', () => {
    expect(seq2.select(value => value * 10).select(value => value * 2).toArray()).toEqual([100, 120, 140, 160, 180]);
    expect(seq2.select((_, index) => index * 2).select((value, index) => value + index * 20).toArray()).toEqual([0, 22, 44, 66, 88]);
    expect(seq2.select(value => value * 10).select((value, index) => value + index * 2).toArray()).toEqual([50, 62, 74, 86, 98]);
    expect(seq2.select((_, index) => index * 2).select(value => value * 10).toArray()).toEqual([0, 20, 40, 60, 80]);
  });

  test('applies select after where', () => {
    expect(seq.where(value => value % 2 === 0).select(value => value * 2).toArray()).toEqual([12, 16, 20, 24, 28]);
    expect(seq.where(value => value % 2 === 0).select((value, index) => value + index * 2).toArray()).toEqual([6, 10, 14, 18, 22]);
    expect(seq.where((_, index) => index % 2 === 0).select(value => value * 2).toArray()).toEqual([10, 14, 18, 22, 26]);
    expect(seq.where((_, index) => index % 2 === 0).select((value, index) => value + index * 2).toArray()).toEqual([5, 9, 13, 17, 21]);
  });

  test('applies select after a select-where chain', () => {
    expect(seq.select(value => value * 2)
        .where(value => value % 2 === 0)
        .select(value => value * 2)
        .toArray()).toEqual([20, 24, 28, 32, 36, 40, 44, 48, 52, 56]);
    expect(seq.select((value, index) => value + index * 2)
        .where(value => value % 2 === 0)
        .select((_, index) => index * 2)
        .toArray()).toEqual([0, 2, 4, 6, 8]);
    expect(seq.select(value => value * 2)
        .where((_, index) => index % 2 === 0)
        .select((value, index) => value * 2 + index)
        .toArray()).toEqual([20, 29, 38, 47, 56]);
    expect(seq.select((value, index) => value + index * 2)
        .where((_, index) => index % 2 === 0)
        .select(value => value * 2)
        .toArray()).toEqual([10, 22, 34, 46, 58]);
  });
});
