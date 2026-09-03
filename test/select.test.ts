import { describe } from 'vitest';
import Enumerable from './sut.js';
import { deepEqual, equal, notDeepEqual, notEqual, ok, strictEqual, strictNotEqual, test } from './test-utils.js';

describe("Projection", () => {
  test("select", function () {
      let actual = Enumerable.range(1, 10).select((i) => i*10).toArray();
      deepEqual(actual, [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
      actual = Enumerable.range(1, 10).select((i,index) => i*10+index).toArray();
      deepEqual(actual, [10, 21, 32, 43, 54, 65, 76, 87, 98, 109]);
  });
});

describe("WhereSelectEnumerable", () => {
  var seq = Enumerable.range(5, 10);

  // 5-14
  var seq2 = Enumerable.range(5, 5);

  test("select", function () {
      deepEqual(seq2.select((value) => value*10).toArray(), [50, 60, 70, 80, 90]);
      deepEqual(seq2.select((value, index) => index*2).toArray(), [0, 2, 4, 6, 8]);
  });

  test('combines consecutive select calls', () => {
      deepEqual(seq2.select(value => value * 10).select(value => value * 2).toArray(), [100, 120, 140, 160, 180]);
      deepEqual(seq2.select((_, index) => index * 2).select((value, index) => value + index * 20).toArray(), [0, 22, 44, 66, 88]);
      deepEqual(seq2.select(value => value * 10).select((value, index) => value + index * 2).toArray(), [50, 62, 74, 86, 98]);
      deepEqual(seq2.select((_, index) => index * 2).select(value => value * 10).toArray(), [0, 20, 40, 60, 80]);
  });

  test('applies select after where', () => {
      deepEqual(seq.where(value => value % 2 === 0).select(value => value * 2).toArray(), [12, 16, 20, 24, 28]);
      deepEqual(seq.where(value => value % 2 === 0).select((value, index) => value + index * 2).toArray(), [6, 10, 14, 18, 22]);
      deepEqual(seq.where((_, index) => index % 2 === 0).select(value => value * 2).toArray(), [10, 14, 18, 22, 26]);
      deepEqual(seq.where((_, index) => index % 2 === 0).select((value, index) => value + index * 2).toArray(), [5, 9, 13, 17, 21]);
  });

  test('applies select after a select-where chain', () => {
      deepEqual(seq.select(value => value * 2).where(value => value % 2 === 0).select(value => value * 2).toArray(), [20, 24, 28, 32, 36, 40, 44, 48, 52, 56]);
      deepEqual(seq.select((value, index) => value + index * 2).where(value => value % 2 === 0).select((_, index) => index * 2).toArray(), [0, 2, 4, 6, 8]);
      deepEqual(seq.select(value => value * 2).where((_, index) => index % 2 === 0).select((value, index) => value * 2 + index).toArray(), [20, 29, 38, 47, 56]);
      deepEqual(seq.select((value, index) => value + index * 2).where((_, index) => index % 2 === 0).select(value => value * 2).toArray(), [10, 22, 34, 46, 58]);
  });
});
