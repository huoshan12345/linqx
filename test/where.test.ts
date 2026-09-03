import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("where", function () {
    let actual = Enumerable.range(1, 10).where((i) => i % 2 === 0).toArray();
    deepEqual(actual, [2, 4, 6, 8, 10]);
    actual = Enumerable.range(1, 10).where((i, index) => (i + index) % 3 === 0).toArray();
    deepEqual(actual, [2, 5, 8]);
  });
});

describe("WhereSelectEnumerable", () => {
  const seq = Enumerable.range(5, 10);

  test("where", function () {
    deepEqual(seq.where((value) => value % 2 === 0).toArray(), [6, 8, 10, 12, 14]);
    deepEqual(seq.where((_, index) => index % 2 === 0).toArray(), [5, 7, 9, 11, 13]);
  });

  test('combines consecutive where calls', () => {
    deepEqual(seq.where(value => value % 2 === 0).where(value => value % 3 === 0).toArray(), [6, 12]);
    deepEqual(seq.where((_, index) => index % 2 === 0).where((_, index) => index % 2 === 0).toArray(), [5, 9, 13]);
    deepEqual(seq.where(value => value % 2 === 0).where((_, index) => index % 2 === 0).toArray(), [6, 10, 14]);
    deepEqual(seq.where((_, index) => index % 2 === 0).where(value => value % 3 === 0).toArray(), [9]);
  });

  test('applies where after select', () => {
    deepEqual(seq.select(value => value * 2).where(value => value % 2 === 0).toArray(), [10, 12, 14, 16, 18, 20, 22, 24, 26, 28]);
    deepEqual(seq.select((value, index) => value + index * 2).where(value => value % 2 === 0).toArray(), [8, 14, 20, 26, 32]);
    deepEqual(seq.select(value => value * 2).where((_, index) => index % 2 === 0).toArray(), [10, 14, 18, 22, 26]);
    deepEqual(seq.select((value, index) => value + index * 2).where((_, index) => index % 2 === 0).toArray(), [5, 11, 17, 23, 29]);
  });

  test('applies where after a where-select chain', () => {
    deepEqual(seq.where(value => value % 2 === 0).select(value => value * 2).where(value => value % 3 === 0).toArray(), [12, 24]);
    deepEqual(
      seq.where(value => value % 2 === 0)
        .select((value, index) => value + index * 2)
        .where((_, index) => index % 2 === 0)
        .toArray(),
      [6, 14, 22]);
    deepEqual(
      seq.where((_, index) => index % 2 === 0)
        .select(value => value * 2)
        .where((_, index) => index % 2 === 0)
        .toArray(),
      [10, 18, 26]);
    deepEqual(
      seq.where((_, index) => index % 2 === 0)
        .select((value, index) => value + index * 2)
        .where(value => value % 3 === 0)
        .toArray(),
      [9, 21]);
  });
});
