import { describe, expect, test } from 'vitest';
import Enumerable from './sut.js';

describe("Enumerable", () => {
  test("rangeTo", function () {
    let actual = Enumerable.rangeTo(5, 10).toArray();
    expect(actual).toEqual([5, 6, 7, 8, 9, 10]);
    actual = Enumerable.rangeTo(1, 10, 3).toArray();
    expect(actual).toEqual([1, 4, 7, 10]);
    actual = Enumerable.rangeTo(-2, -8).toArray();
    expect(actual).toEqual([-2, -3, -4, -5, -6, -7, -8]);
    actual = Enumerable.rangeTo(-2, -8, 2).toArray();
    expect(actual).toEqual([-2, -4, -6, -8]);

    expect(Enumerable.rangeTo(1, 4).toArray()).toEqual([1, 2, 3, 4]);
    expect(Enumerable.rangeTo(-3, 6).toArray()).toEqual([-3, -2, -1, 0, 1, 2, 3, 4, 5, 6]);
    expect(Enumerable.rangeTo(2, -5).toArray()).toEqual([2, 1, 0, -1, -2, -3, -4, -5]);
    expect(Enumerable.rangeTo(1, 5, 3).toArray()).toEqual([1, 4]);
    expect(Enumerable.rangeTo(1, -5, 3).toArray()).toEqual([1, -2, -5]);
    expect(Enumerable.rangeTo(1, -6, 3).toArray()).toEqual([1, -2, -5]);

    expect(Enumerable.rangeTo(4, 4).toArray()).toEqual([4]);
    expect(Enumerable.rangeTo(4, 4, 3).toArray()).toEqual([4]);
  });
});
test('rangeTo infers descending direction and includes the endpoint', () => {
  expect(Enumerable.rangeTo(5, 1, 2).toArray()).toEqual([5, 3, 1]);
});

test('rangeTo uses the absolute step value', () => {
  expect(Enumerable.rangeTo(1, 5, -2).toArray()).toEqual([1, 3, 5]);
});
