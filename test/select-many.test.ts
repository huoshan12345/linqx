import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("selectMany", function () {
    let actual = Enumerable.range(1, 5)
      .selectMany(function (i) { return Enumerable.repeat(i, 2); })
      .toArray();
    expect(actual).toEqual([1, 1, 2, 2, 3, 3, 4, 4, 5, 5]);
    actual = Enumerable.range(1, 5)
      .selectMany(function (i, index) { return Enumerable.repeat(i, index + 1); })
      .toArray();
    expect(actual).toEqual([1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5]);
    actual = Enumerable.range(1, 5)
      .selectMany(function (i) { return Enumerable.repeat(i, 2); }, (i) => i * 10)
      .toArray();
    expect(actual).toEqual([10, 10, 20, 20, 30, 30, 40, 40, 50, 50]);
    actual = Enumerable.range(1, 5)
      .selectMany(function (i, index) { return Enumerable.repeat(i, index + 1); }, (i) => i * 10)
      .toArray();
    expect(actual).toEqual([10, 20, 20, 30, 30, 30, 40, 40, 40, 40, 50, 50, 50, 50, 50]);
  });
});
test('selectMany flattens array-like projections and passes source indexes', () => {
  const result = Enumerable.from(['a', 'b'])
    .selectMany((value, index) => ({ 0: value, 1: String(index), length: 2 }))
    .toArray();

  expect(result).toEqual(['a', '0', 'b', '1']);
});

test('selectMany combines each outer and inner element with a result selector', () => {
  expect(Enumerable.from([1, 2]).selectMany(_value => [10, 20], (outer, inner) => outer + inner)
    .toArray())
    .toEqual([11, 21, 12, 22]);
});
