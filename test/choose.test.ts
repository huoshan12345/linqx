import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Projection", () => {
  test("choose", function () {
    const sequence = Enumerable.from<(number | null)>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(sequence.choose(function (x) {
      return x !== null && x % 2 === 0 ? null : x;
    }).toArray()).toEqual([1, 3, 5, 7, 9]);
  });
});
test('choose omits both null and undefined projections', () => {
  const values = Enumerable.from([0, 1, 2])
    .choose(value => [null, undefined, value][value] as number)
    .toArray();

  expect(values).toEqual([2]);
});

test('choose passes the zero-based source index to the selector', () => {
  expect(Enumerable.from([10, 10, 10]).choose((value, index) => value + index).toArray())
    .toEqual([10, 11, 12]);
});
